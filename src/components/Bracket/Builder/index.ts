import { BracketRound } from 'types/BracketRound';
import { BracketParticipant } from 'types/BracketParticipant';

import orderBySeed from './orderBySeed';
import populateRound from './populateRound';
import generateRounds from './generateRounds';
import generateTBCParticipants from './generateTBCParticipants';

function splitAndPadMissingParticipants(
  participants: BracketParticipant[],
  padCount: number
) {
  const participantsHalf = participants.length / 2;

  return [
    ...participants.slice(0, participantsHalf),
    ...generateTBCParticipants(padCount),
    ...participants.slice(participantsHalf)
  ];
}

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

  // Create qualifier round if the number of participants doesn't fit.
  if (remainder !== 0) {
    const paddingParticipantsCount = (participantCount - remainder) * 2;
    const qualifiers = splitAndPadMissingParticipants(
      participants.slice(remainderParticipants),
      paddingParticipantsCount
    );

    const orderedQualifiers = orderBySeed(qualifiers); // TODO .reverse();
    rounds.push(populateRound(orderedQualifiers, 'Qualifiers'));
  }

  // Create round for participants (potentially after a qualifier)
  const postQualifierCount = participants.length + remainderParticipants;
  const participantsAfterQualifiers = participants.slice(0, postQualifierCount);
  participantsAfterQualifiers.push(...generateTBCParticipants(remainder));

  const orderedPostQualifiers = orderBySeed(participantsAfterQualifiers);
  rounds.push(populateRound(orderedPostQualifiers));

  // Create future rounds based on participant count
  if (orderedPostQualifiers.length > 2) {
    rounds.push(...generateRounds(orderedPostQualifiers.length / 2));
  }

  return rounds;
}
