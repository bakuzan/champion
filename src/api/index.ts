import db from './database';

import { BracketInformation } from 'types/BracketInformation';
import { BracketParticipant } from 'types/BracketParticipant';
import { BracketTemplate } from 'types/BracketTemplate';

import filterFalsey from 'utils/filterFalsey';

import { validateSaveBracketTemplateRequest } from './validate';

const addParticipantSeedOrder = (p: BracketParticipant, i: number) => ({
  ...p,
  seedOrder: i
});

// API functions

export function getBracketTemplate(bracketTemplateId: string | number) {
  const templateId = Number(bracketTemplateId);
  if (isNaN(templateId)) {
    throw new Error(
      'Invalid BracketTemplate Id passed to api.getBracketTemplate'
    );
  }

  const bracketTemplate: BracketInformation = db
    .prepare(`SELECT * FROM BracketTemplate WHERE id = ?`)
    .get(templateId);

  const bracketParticipants: BracketParticipant[] = db
    .prepare(
      `SELECT * 
         FROM BracketParticipant 
        WHERE bracketTemplateId = ? 
        ORDER BY seedOrder`
    )
    .all(templateId);

  // Combine data for returning to UI
  const bracketTemplateItem: BracketTemplate = {
    ...bracketTemplate,
    participants: bracketParticipants
  };

  return bracketTemplateItem;
}

export function saveBracketTemplate(payload: BracketTemplate) {
  let bracketTemplateId: number = null;

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
    const deleteMissingBracketParticipants = db.prepare(`
      DELETE FROM BracketParticipant
       WHERE bracketTemplateId = @bracketTemplateId
         AND id NOT IN (?)`);

    const updateBracketTemplate = db.transaction((input: BracketTemplate) => {
      const resultTemplate = updateExistingBracketTemplate.run(input);
      bracketTemplateId = resultTemplate.lastInsertRowid as number;
      const participants = input.participants.map(addParticipantSeedOrder);

      const currentParticipantIds = participants
        .map((p) => p.id)
        .filter(filterFalsey)
        .join(',');

      // Delete participants that are not in the request.
      deleteMissingBracketParticipants.run({
        bracketTemplateId,
        currentParticipantIds
      });

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
