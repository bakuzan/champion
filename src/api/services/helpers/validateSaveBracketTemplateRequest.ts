import { BracketTemplate } from 'types/BracketTemplate';
import { SaveBracketTemplateResponse } from 'types/Responses';

import { isNullOrEmpty } from './common';

export default function validateSaveBracketTemplateRequest(
  payload: BracketTemplate
): SaveBracketTemplateResponse {
  const errorMessages = new Map<string, string>([]);
  let success = true;

  if (isNullOrEmpty(payload.name)) {
    errorMessages.set('name', 'Bracket Template Name is required.');
    success = false;
  }

  const missingParticipantNames: number[] = [];
  for (let i = 0; i < payload.participants.length; i++) {
    const part = payload.participants[i];

    if (isNullOrEmpty(part.text)) {
      missingParticipantNames.push(i);
      const indexList = missingParticipantNames.join(',');

      errorMessages.set(
        'participantText',
        `Bracket Template Participant Name is required.\r\nParticipant indexes: ${indexList}.`
      );

      success = false;
    }
  }

  return { success, errorMessages };
}
