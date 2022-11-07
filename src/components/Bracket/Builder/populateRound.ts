import { BracketMatchup } from 'types/BracketMatchup';
import { BracketParticipant } from 'types/BracketParticipant';
import { BracketRound } from 'types/BracketRound';

import chunk from 'utils/chunk';
import getRoundName from 'utils/getRoundName';

export default function populateRound(
  participants: BracketParticipant[],
  name: string = null
): BracketRound {
  const matchups: BracketMatchup[] = [];
  const pairs = chunk(participants, 2);

  for (let pair of pairs) {
    matchups.push({
      participantOne: pair[0],
      participantTwo: pair[1]
    });
  }

  return {
    name: name ?? getRoundName(matchups.length),
    matchups
  };
}
