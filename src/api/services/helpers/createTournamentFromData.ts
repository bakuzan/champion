import db from '../../database';

import { BracketInformation } from 'types/BracketInformation';
import { BracketMatchup } from 'types/BracketMatchup';
import { BracketParticipant } from 'types/BracketParticipant';
import { CreateTournamentResponse } from 'types/Responses';

import { buildRounds } from 'builder/index';

const ifStringReturnNullInstead = (bp: BracketParticipant) =>
  typeof bp.id === 'string' ? null : bp.id;

const resolveParticipantIds = (match: BracketMatchup) => ({
  oneId: ifStringReturnNullInstead(match.participantOne),
  twoId: ifStringReturnNullInstead(match.participantTwo)
});

export default function createTournamentFromData(
  bracketTemplate: BracketInformation,
  bracketParticipants: BracketParticipant[],
  ancestorTournamentId: number = null
): CreateTournamentResponse {
  const errorMessages = new Map<string, string>([]);

  /** Create the tournament
   */
  let tournamentId: number = null;
  const insertTournament = db.prepare(`
    INSERT INTO Tournament(name,description,includePlayoff,ancestorTournamentId)
    VALUES (@name, @description, @includePlayoff, @ancestorTournamentId)`);

  const insertNewBracketParticipant = db.prepare(`
    INSERT INTO TournamentParticipant(text,image,seedOrder,tournamentId) 
    VALUES (@text, @image, @seedOrder, @tournamentId)`);

  const insertMatchup = db.prepare(`
    INSERT INTO TournamentMatchup(tournamentId,roundNumber,roundMatchNumber
      ,participantOneId,participantOneScore
      ,participantTwoId,participantTwoScore)
    VALUES (@tournamentId, @roundNumber, @roundMatchNumber, @participantOneId, 0, @participantTwoId, 0)`);

  const createTournament = db.transaction(
    (template: BracketInformation, participants: BracketParticipant[]) => {
      const resultTemplate = insertTournament.run({
        ...template,
        ancestorTournamentId
      });

      tournamentId = resultTemplate.lastInsertRowid as number;

      for (const part of participants) {
        const resultParticipant = insertNewBracketParticipant.run({
          ...part,
          tournamentId
        });

        part.id = resultParticipant.lastInsertRowid as number;
      }

      const rounds = buildRounds(participants, template.includePlayoff);

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
