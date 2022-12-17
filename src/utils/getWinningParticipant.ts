import { BracketMatchup } from 'types/BracketMatchup';
import { TournamentRoundMatchup } from 'types/Tournament';
import { isBracketMatchup } from './guards';

export default function getWinningParticipant(
  matchup: BracketMatchup | TournamentRoundMatchup
) {
  if (isBracketMatchup(matchup)) {
    return null;
  }

  if (matchup.participantOneScore === matchup.participantTwoScore) {
    return null;
  }

  return matchup.participantOneScore > matchup.participantTwoScore
    ? matchup.participantOne
    : matchup.participantTwo;
}
