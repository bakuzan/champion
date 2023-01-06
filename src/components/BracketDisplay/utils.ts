import { BracketMatchup } from 'types/BracketMatchup';
import { BracketRound } from 'types/BracketRound';
import { TournamentRound, TournamentRoundMatchup } from 'types/Tournament';

import { isPlaceholder } from 'utils/checks';
import { isBracketMatchup } from 'utils/guards';
import { createClickEquivalentHandler } from 'utils/accessibility';
import getWinningParticipant from 'utils/getWinningParticipant';
import { BracketParticipant } from 'types/BracketParticipant';

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

const slotPropStyle = { cursor: 'pointer' };

export function getSlotProps(
  match: TournamentRoundMatchup | BracketMatchup,
  onClickSlot: (participant: BracketParticipant) => void
) {
  const slotProps = { pOne: {}, pTwo: {} };

  if (!isBracketMatchup(match)) {
    return slotProps;
  }

  const onClickPOne = () => onClickSlot(match.participantOne);
  const onClickPTwo = () => onClickSlot(match.participantTwo);

  if (!isPlaceholder(match.participantOne)) {
    slotProps.pOne = {
      role: 'button',
      tabIndex: 0,
      style: slotPropStyle,
      onClick: onClickPOne,
      onKeyDown: createClickEquivalentHandler(onClickPOne)
    };
  }

  if (!isPlaceholder(match.participantTwo)) {
    slotProps.pTwo = {
      role: 'button',
      tabIndex: 0,
      style: slotPropStyle,
      onClick: onClickPTwo,
      onKeyDown: createClickEquivalentHandler(onClickPTwo)
    };
  }

  return slotProps;
}

export function getTournamentWinner(
  rounds: BracketRound[] | TournamentRound[]
) {
  const finalRound = rounds[rounds.length - 1];
  if (!finalRound) {
    return false;
  }

  const finalMatch = finalRound.matchups[0];
  return getWinningParticipant(finalMatch);
}
