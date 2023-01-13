import { BracketRound } from 'types/BracketRound';
import { BracketParticipant } from 'types/BracketParticipant';

import { orderBySeed, orderByFirstAndLast } from './ordering';
import { populateRound, populateQualifiers } from './populateRound';
import generateRounds from './generateRounds';
import generateTBCParticipants from './generateTBCParticipants';

export function buildRounds(participants: BracketParticipant[]) {
  const rounds: BracketRound[] = [];
  const participantCount = participants.length;

  // If you have nothing, do nothing.
  if (participantCount < 2) {
    return [];
  }

  const exponent = Math.log2(participantCount);
  const remainder = Math.round(2 ** exponent) % 2 ** Math.floor(exponent);
  const remainderParticipants = -remainder * 2;

  // Create round for participants (potentially after a qualifier)
  const postQualifierCount = participants.length + remainderParticipants;
  const participantsAfterQualifiers = participants.slice(0, postQualifierCount);
  participantsAfterQualifiers.push(...generateTBCParticipants(remainder));

  const orderedPostQualifiers = orderBySeed(participantsAfterQualifiers);
  rounds.push(populateRound(orderedPostQualifiers, false));

  // Create future rounds based on participant count
  if (orderedPostQualifiers.length > 2) {
    rounds.push(...generateRounds(orderedPostQualifiers.length / 2));
  }

  // Create qualifier round if the number of participants doesn't fit.
  if (remainder !== 0) {
    const firstFullRound = rounds[0];
    const qualifierParticipantCount = (participantCount - remainder) * 2;
    const orderedQualifiers = orderByFirstAndLast(
      participants.slice(remainderParticipants)
    );
    const paddingParticipants = generateTBCParticipants(
      qualifierParticipantCount
    );
    const qualifierParticipants = [
      ...orderedQualifiers,
      ...paddingParticipants
    ].slice(0, qualifierParticipantCount);

    rounds.unshift(populateQualifiers(firstFullRound, qualifierParticipants));
  }

  return rounds;
}
