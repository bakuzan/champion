import { BracketMatchup } from 'types/BracketMatchup';
import { BracketParticipant } from 'types/BracketParticipant';
import { BracketRound } from 'types/BracketRound';

import { generateSeed } from './ordering';

import { QualifierRoundName } from 'constants/index';
import chunk from 'utils/chunk';
import getRoundName from 'utils/getRoundName';

export function populateRound(
  participants: BracketParticipant[]
): BracketRound {
  const matchups: BracketMatchup[] = [];
  const pairs = chunk(participants, 2);

  for (const pair of pairs) {
    matchups.push({
      participantOne: pair[0],
      participantTwo: pair[1]
    });
  }

  return {
    name: getRoundName(matchups.length),
    matchups
  };
}

const getSeedIndexes = (seed: number[]) =>
  Array.from(Array(seed.length).keys()).sort((a, b) =>
    seed[a] > seed[b] ? -1 : seed[b] < seed[a] ? 1 : 0
  );

export function populateQualifiers(
  round: BracketRound,
  participants: BracketParticipant[]
): BracketRound {
  const pairedParticipants = chunk(participants, 2);
  const nextRoundSeed = generateSeed(round.matchups.length * 2);
  const seedIndexes = getSeedIndexes(nextRoundSeed);
  const matchups = Array(pairedParticipants.length).fill(null);

  for (let i = 0; i < pairedParticipants.length; i++) {
    const parts = pairedParticipants[i];
    const seedIndex = seedIndexes[i];

    const match: BracketMatchup = {
      participantOne: parts[0],
      participantTwo: parts[1]
    };

    matchups[seedIndex] = match;
  }

  return {
    name: QualifierRoundName,
    matchups
  };
}
