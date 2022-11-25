import db from './database';

import { BracketTemplate } from 'types/BracketTemplate';

export function saveBracketTemplate(payload: BracketTemplate) {
  let bracketTemplateId: number = null;

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
      const resultTemplate = updateExistingBracketTemplate.run(input);
      bracketTemplateId = resultTemplate.lastInsertRowid as number;
      const participants = input.participants.map((p, i) => ({
        ...p,
        seedOrder: i
      }));

      for (const part of participants) {
        updateExistingBracketParticipant.run(part);
      }
    });

    updateBracketTemplate(payload);
  } else {
    // Create new template
    const insertNewBracketTemplate = db.prepare(`
        INSERT INTO BracketTemplate(name,description) 
        VALUES (@name, @description)`);
    const insertNewBracketParticipant = db.prepare(`
        INSERT INTO BracketParticipant(text,imageUrl,seedOrder,bracketTemplateId) 
        VALUES (@text, @imageUrl, @seedOrder, @bracketTemplateId)`);

    const createBracketTemplate = db.transaction((input: BracketTemplate) => {
      const resultTemplate = insertNewBracketTemplate.run(input);
      bracketTemplateId = resultTemplate.lastInsertRowid as number;
      const participants = input.participants.map((p, i) => ({
        ...p,
        seedOrder: i
      }));

      for (const part of participants) {
        insertNewBracketParticipant.run({
          bracketTemplateId,
          ...part
        });
      }
    });

    createBracketTemplate(payload);
  }

  return bracketTemplateId;
}
