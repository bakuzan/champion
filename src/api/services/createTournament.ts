import db from '../database';

import { BracketInformation } from 'types/BracketInformation';
import { BracketParticipant } from 'types/BracketParticipant';
import { CreateTournamentResponse } from 'types/Responses';

const MINIMUM_REQUIRED_PARTICIPANTS = 4;

export default function createTournament(
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

  /** Create the tournament
   */
  let tournamentId: number = null;
  const insertTournament = db.prepare(`
    INSERT INTO Tournament(name,description)
    VALUES (@name, @description)`);

  const insertNewBracketParticipant = db.prepare(`
    INSERT INTO TournamentParticipant(text,imageUrl,seedOrder,tournamentId) 
    VALUES (@text, @imageUrl, @seedOrder, @tournamentId)`);

  const insertMatchup = db.prepare(`
    INSERT INTO TournamentMatchup(tournamentId,participantOneId,participantOneScore,participantTwoId,participantTwoScore)
    VALUES (@tournamentId, @participantOneId, 0, @participantTwoId, 0)`);

  const createTournament = db.transaction(
    (template: BracketInformation, participants: BracketParticipant[]) => {
      const resultTemplate = insertTournament.run(template);
      tournamentId = resultTemplate.lastInsertRowid as number;

      for (const part of participants) {
        insertNewBracketParticipant.run({
          tournamentId,
          ...part
        });
      }

      // TODO
      // Generate first round of matches (generate all matches??)
      // Insert matchups
    }
  );

  createTournament(bracketTemplate, bracketParticipants);

  return { success: true, tournamentId, errorMessages };
}
