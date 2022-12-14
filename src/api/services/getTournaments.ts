import db from '../database';

import getStoredProceedure from 'api/database/storedProceedures';

import { SingleEliminationTournament } from 'types/SingleEliminationTournament';
import {
  Tournament,
  TournamentMatchup,
  TournamentParticipant,
  TournamentRound
} from 'types/Tournament';

import { QualifierRoundName } from 'constants/index';
import { getTBCTournamentParticipant } from 'builder/generateTBCParticipants';
import { getRoundNameFromMatchCount } from 'utils/getRoundName';

export function getTournaments() {
  const query = getStoredProceedure('GetTournamentsWithProgressInfo');
  return db.prepare(query).all();
}

export function getTournament(tourneyId: string | number) {
  const tournamentId = Number(tourneyId);
  if (isNaN(tournamentId)) {
    throw new Error('Invalid Tournament Id passed to api.getBracketTemplate');
  }

  const tournament: Tournament = db
    .prepare(`SELECT * FROM Tournament WHERE id = ?`)
    .get(tournamentId);

  const participants: TournamentParticipant[] = db
    .prepare(
      `SELECT * 
         FROM TournamentParticipant 
        WHERE tournamentId = ? 
        ORDER BY seedOrder`
    )
    .all(tournamentId);

  const matchups: TournamentMatchup[] = db
    .prepare(
      `SELECT * 
         FROM TournamentMatchup
        WHERE tournamentId = ? 
        ORDER BY roundNumber, roundMatchNumber`
    )
    .all(tournamentId);

  // Build bracket rounds
  const rounds: TournamentRound[] = [];
  const lastIndex = matchups.length - 1;
  const finalRound = matchups[lastIndex].roundNumber;

  for (let i = 1; i <= finalRound; i++) {
    const roundMatches = matchups.filter((x) => x.roundNumber === i);
    const isQualifier =
      i === 1 && roundMatches.some((x) => x.participantOneId === null);

    rounds.push({
      name: isQualifier
        ? QualifierRoundName
        : getRoundNameFromMatchCount(roundMatches.length),
      matchups: roundMatches.map((x) => {
        const uid = x.roundNumber + x.roundMatchNumber;

        return {
          ...x,
          participantOne:
            participants.find((p) => p.id === x.participantOneId) ??
            getTBCTournamentParticipant(uid + 1),
          participantTwo:
            participants.find((p) => p.id === x.participantTwoId) ??
            getTBCTournamentParticipant(uid + 2)
        };
      })
    });
  }

  // Combine data for returning to UI
  const tournamentItem: SingleEliminationTournament = {
    ...tournament,
    participants,
    matchups,
    rounds
  };

  return tournamentItem;
}
