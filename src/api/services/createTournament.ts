import db from '../database';

import { BracketInformation } from 'types/BracketInformation';
import { BracketParticipant } from 'types/BracketParticipant';
import { CreateTournamentResponse } from 'types/Responses';

import createTournamentFromData from './helpers/createTournamentFromData';

const MINIMUM_REQUIRED_PARTICIPANTS = 4;

export function createTournament(
  bracketTemplateId: number
): CreateTournamentResponse {
  const errorMessages = new Map<string, string>([]);

  /** Validate Bracket for Tournament creation
   */

  const bracketTemplate: BracketInformation = db
    .prepare(`SELECT * FROM BracketTemplate WHERE id = ?`)
    .get(bracketTemplateId);

  if (!bracketTemplate) {
    return {
      success: false,
      errorMessages: errorMessages.set(
        'notFound',
        `Bracket Template not found for Id ${bracketTemplateId}.\r\nUnable to create new tournament.`
      )
    };
  }

  const bracketParticipants: BracketParticipant[] = db
    .prepare(
      `SELECT * 
         FROM BracketParticipant 
        WHERE bracketTemplateId = ? 
        ORDER BY seedOrder`
    )
    .all(bracketTemplate.id);

  if (bracketParticipants.length < MINIMUM_REQUIRED_PARTICIPANTS) {
    return {
      success: false,
      errorMessages: errorMessages.set(
        'missingParticipants',
        `To create a tournament, the template must have at least ${MINIMUM_REQUIRED_PARTICIPANTS} participants.`
      )
    };
  }

  return createTournamentFromData(bracketTemplate, bracketParticipants);
}

export function createTournamentFromResults(
  bracketTemplate: BracketInformation,
  bracketParticipants: BracketParticipant[]
) {
  return createTournamentFromData(bracketTemplate, bracketParticipants);
}
