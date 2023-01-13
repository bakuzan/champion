import { BracketRound } from 'types/BracketRound';

import generateTBCParticipants from './generateTBCParticipants';
import { populateRound } from './populateRound';

export default function generateRounds(participantCount: number) {
  const rounds: BracketRound[] = [];

  let building = true;
  let remainingCount = participantCount;

  while (building) {
    const hasThirdPlacePlayoff = remainingCount === 2;
    const roundParticipantCount = hasThirdPlacePlayoff ? 4 : remainingCount;

    const dummyParticipants = generateTBCParticipants(roundParticipantCount);
    rounds.push(populateRound(dummyParticipants, hasThirdPlacePlayoff));

    remainingCount /= 2;
    building = remainingCount !== 1;
  }

  return rounds;
}
