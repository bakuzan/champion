import { BracketMatchup } from 'types/BracketMatchup';
import { BracketRound } from 'types/BracketRound';
import { TournamentRound, TournamentRoundMatchup } from 'types/Tournament';

import { isPlaceholder } from 'utils/checks';
import { isBracketMatchup } from 'utils/guards';
import { createClickEquivalentHandler } from 'utils/accessibility';
import getWinningParticipant from 'utils/getWinningParticipant';

export function getMatchProps(
  match: TournamentRoundMatchup | BracketMatchup,
  onMatchSelect: (match: TournamentRoundMatchup) => void
) {
  if (isBracketMatchup(match)) {
    return {};
  }

  if (
    isPlaceholder(match.participantOne) ||
    isPlaceholder(match.participantTwo)
  ) {
    return {};
  }

  // We have to reassign because typescript isn't smart enough
  // to realise the type assertion inside the function!
  const tournamentMatchup = match;

  function onClick() {
    onMatchSelect(tournamentMatchup);
  }

  return {
    role: 'button',
    tabIndex: 0,
    onClick,
    onKeyDown: createClickEquivalentHandler(onClick)
  };
}

export function getTournamentWinner(
  rounds: BracketRound[] | TournamentRound[]
) {
  const finalRound = rounds[rounds.length - 1];
  const finalMatch = finalRound.matchups[0];
  return getWinningParticipant(finalMatch);
}
