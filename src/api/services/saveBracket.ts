import db from '../database';

import { BracketParticipant } from 'types/BracketParticipant';
import { BracketTemplate } from 'types/BracketTemplate';

import filterFalsey from 'utils/filterFalsey';

import { validateSaveBracketTemplateRequest } from './helpers/validate';

const addParticipantSeedOrder = (p: BracketParticipant, i: number) => ({
  ...p,
  seedOrder: i
});

export function saveBracketTemplate(payload: BracketTemplate) {
  let bracketTemplateId: number = payload.id ?? null;
  console.log('API: saveBracketTemplate :: ', payload);
  const response = validateSaveBracketTemplateRequest(payload);
  if (!response.success) {
    return response;
  }

  const insertNewBracketParticipant = db.prepare(`
      INSERT INTO BracketParticipant(text,imageUrl,seedOrder,bracketTemplateId) 
      VALUES (@text, @imageUrl, @seedOrder, @bracketTemplateId)`);

  if (payload.id) {
    // Update existing template
    const updateExistingBracketTemplate = db.prepare(`
        UPDATE BracketTemplate
           SET name = @name
             , description = @description 
         WHERE id = @id`);
    const updateExistingBracketParticipant = db.prepare(`
        UPDATE BracketParticipant
           SET text = @text
             , imageUrl = @imageUrl
             , seedOrder = @seedOrder 
         WHERE id = @id`);

    const updateBracketTemplate = db.transaction((input: BracketTemplate) => {
      updateExistingBracketTemplate.run(input);

      const participants = input.participants.map(addParticipantSeedOrder);
      const currentParticipantIds = participants
        .map((p) => p.id)
        .filter(filterFalsey);

      // Delete existing participants that are not in the request.
      const deleteMissingBracketParticipants = db.prepare(`
          DELETE FROM BracketParticipant
           WHERE bracketTemplateId = @bracketTemplateId
             AND id NOT IN (${currentParticipantIds
               .map(() => '?')
               .join(',')})`);

      deleteMissingBracketParticipants.run(
        {
          bracketTemplateId
        },
        currentParticipantIds
      );

      // Update existing/Create new
      for (const part of participants) {
        // Update if has id, else insert
        if (part.id) {
          updateExistingBracketParticipant.run(part);
        } else {
          insertNewBracketParticipant.run({
            bracketTemplateId,
            ...part
          });
        }
      }
    });

    updateBracketTemplate(payload);
  } else {
    // Create new template
    const insertNewBracketTemplate = db.prepare(`
        INSERT INTO BracketTemplate(name,description) 
        VALUES (@name, @description)`);

    const createBracketTemplate = db.transaction((input: BracketTemplate) => {
      const resultTemplate = insertNewBracketTemplate.run(input);
      bracketTemplateId = resultTemplate.lastInsertRowid as number;
      const participants = input.participants.map(addParticipantSeedOrder);

      for (const part of participants) {
        insertNewBracketParticipant.run({
          bracketTemplateId,
          ...part
        });
      }
    });

    createBracketTemplate(payload);
  }

  response.bracketTemplateId = bracketTemplateId;
  return response;
}
