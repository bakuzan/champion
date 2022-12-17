import db from '../database';

import { TournamentRoundMatchup } from 'types/Tournament';

export default function saveTournamentMatchResult(
  match: TournamentRoundMatchup
) {
  // TODO perform some sort of validation or protection here

  const updateMatchup = db.prepare(`
    UPDATE TournamentMatchup
       SET participantOneScore = @participantOneScore
         , participantTwoScore = @participantTwoScore
     WHERE tournamentId = @tournamentId
       AND roundNumber = @roundNumber
       AND roundMatchNumber = @roundMatchNumber`);

  const nextRoundMatch = db.prepare(`
    SELECT *
      FROM TournamentMatchup
     WHERE tournamentId = @tournamentId
       AND roundNumber = @roundNumber
       AND roundMatchNumber = @roundMatchNumber`);

  const updateNextMatchupParticipantOne = db.prepare(`
    UPDATE TournamentMatchup
       SET participantOneId = @participantId
     WHERE tournamentId = @tournamentId
       AND roundNumber = @roundNumber
       AND roundMatchNumber = @roundMatchNumber`);

  const updateNextMatchupParticipantTwo = db.prepare(`
     UPDATE TournamentMatchup
        SET participantTwoId = @participantId
      WHERE tournamentId = @tournamentId
        AND roundNumber = @roundNumber
        AND roundMatchNumber = @roundMatchNumber`);

  const updateTournamentMatchStatus = db.transaction(
    (update: TournamentRoundMatchup) => {
      updateMatchup.run(update);

      // We now need to update future match with the winner!
      const nextRoundNumber = update.roundNumber + 1;
      const nextRoundMatchNumber = Math.ceil(update.roundMatchNumber / 2);

      const nextRoundQueryParams = {
        tournamentId: update.tournamentId,
        roundNumber: nextRoundNumber,
        roundMatchNumber: nextRoundMatchNumber
      };

      const nextMatch = nextRoundMatch.get(nextRoundQueryParams);

      // nextMatch will be null if the update is for the final match!
      if (nextMatch) {
        const willBeParticipantOne = update.roundMatchNumber % 2 !== 0;
        const winningParticipant =
          update.participantOneScore > update.participantTwoScore
            ? update.participantOne
            : update.participantTwo;

        const updateNextMatchup = willBeParticipantOne
          ? updateNextMatchupParticipantOne
          : updateNextMatchupParticipantTwo;

        updateNextMatchup.run({
          ...nextRoundQueryParams,
          participantId: winningParticipant.id
        });
      }
    }
  );

  updateTournamentMatchStatus(match);

  return {
    success: true,
    errorMessages: new Map<string, string>([]),
    tournamentId: match.tournamentId
  };
}
