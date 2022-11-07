import { BracketRound } from 'types/BracketRound';
import generateTBCParticipants from './generateTBCParticipants';
import populateRound from './populateRound';

export default function generateRounds(participantCount: number) {
  const rounds: BracketRound[] = [];

  let building = true;
  let remainingCount = participantCount;

  while (building) {
    const dummyParticipants = generateTBCParticipants(remainingCount);
    rounds.push(populateRound(dummyParticipants));

    remainingCount /= 2;
    building = remainingCount !== 1;
  }

  return rounds;
}
