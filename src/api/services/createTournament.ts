import db from '../database';

import { BracketInformation } from 'types/BracketInformation';
import { BracketMatchup } from 'types/BracketMatchup';
import { BracketParticipant } from 'types/BracketParticipant';
import { CreateTournamentResponse } from 'types/Responses';

import { buildRounds } from 'builder/index';

const MINIMUM_REQUIRED_PARTICIPANTS = 4;

const ifStringReturnNullInstead = (bp: BracketParticipant) =>
  typeof bp.id === 'string' ? null : bp.id;

const resolveParticipantIds = (match: BracketMatchup) => ({
  oneId: ifStringReturnNullInstead(match.participantOne),
  twoId: ifStringReturnNullInstead(match.participantTwo)
});

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
    INSERT INTO TournamentMatchup(tournamentId,roundNumber,roundMatchNumber
      ,participantOneId,participantOneScore
      ,participantTwoId,participantTwoScore)
    VALUES (@tournamentId, @roundNumber, @roundMatchNumber, @participantOneId, 0, @participantTwoId, 0)`);

  const createTournament = db.transaction(
    (template: BracketInformation, participants: BracketParticipant[]) => {
      const resultTemplate = insertTournament.run(template);
      tournamentId = resultTemplate.lastInsertRowid as number;

      for (const part of participants) {
        const resultParticipant = insertNewBracketParticipant.run({
          tournamentId,
          ...part
        });

        part.id = resultParticipant.lastInsertRowid as number;
      }

      const rounds = buildRounds(participants);

      for (let i = 0; i < rounds.length; i++) {
        const currentRound = rounds[i];
        const roundNumber = i + 1;

        for (let j = 0; j < currentRound.matchups.length; j++) {
          const currentMatchup = currentRound.matchups[j];
          const roundMatchNumber = j + 1;
          const pIds = resolveParticipantIds(currentMatchup);

          insertMatchup.run({
            tournamentId,
            roundNumber,
            roundMatchNumber,
            participantOneId: pIds.oneId,
            participantTwoId: pIds.twoId
          });
        }
      }
    }
  );

  createTournament(bracketTemplate, bracketParticipants);

  return { success: true, tournamentId, errorMessages };
}
