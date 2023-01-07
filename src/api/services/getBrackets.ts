import db from '../database';

import { BracketInformation } from 'types/BracketInformation';
import { BracketParticipant } from 'types/BracketParticipant';
import { BracketTemplate } from 'types/BracketTemplate';

export function getBracketTemplates() {
  const bracketTemplates: BracketInformation[] = db
    .prepare(
      `SELECT * 
         FROM BracketTemplate 
        WHERE isDeleted = 0 
        ORDER BY createdAt DESC`
    )
    .all();

  return bracketTemplates;
}

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
