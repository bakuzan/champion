import { BracketRound } from 'types/BracketRound';
import { BracketParticipant } from 'types/BracketParticipant';

import orderBySeed from './orderBySeed';
import populateRound from './populateRound';
import generateRounds from './generateRounds';
import generateTBCParticipants from './generateTBCParticipants';

export function buildRounds(participants: BracketParticipant[]) {
  const rounds: BracketRound[] = [];
  const participantCount = participants.length;
  const exponent = Math.log2(participantCount);
  const remainder = Math.round(2 ** exponent) % 2 ** Math.floor(exponent);
  const remainderParticipants = -remainder * 2;

  // Create qualifer round if the number of participants doesn't fit.
  if (remainder !== 0) {
    const qualifiers = participants.slice(remainderParticipants);
    const orderedQualifiers = orderBySeed(qualifiers);
    rounds.push(populateRound(orderedQualifiers, 'Qualifers'));
  }

  // Create round for participants (potentially after a qualifer)
  const postQualifierCount = participants.length + remainderParticipants;
  const participantsAfterQualifiers = participants.slice(0, postQualifierCount);
  participantsAfterQualifiers.push(...generateTBCParticipants(remainder));

  const orderedPostQualifers = orderBySeed(participantsAfterQualifiers);
  rounds.push(populateRound(orderedPostQualifers));

  // Create future rounds based on participant count
  rounds.push(...generateRounds(orderedPostQualifers.length / 2));

  return rounds;
}
