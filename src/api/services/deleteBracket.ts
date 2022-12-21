import db from '../database';
import { getCurrentTimestamp } from './helpers/common';

export default function deleteBracketTemplate(
  bracketTemplateId: string | number
) {
  const templateId = Number(bracketTemplateId);
  if (isNaN(templateId)) {
    throw new Error(
      'Invalid BracketTemplate Id passed to api.deleteBracketTemplate'
    );
  }

  db.prepare(
    `UPDATE BracketTemplate 
        SET isDeleted = 1
          , deletedAt = @deletedAt 
      WHERE id = @templateId`
  ).run({ templateId, deletedAt: getCurrentTimestamp() });

  return { success: true, errorMessages: new Map<string, string>([]) };
}
