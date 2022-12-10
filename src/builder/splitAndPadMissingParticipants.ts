import { BracketParticipant } from 'types/BracketParticipant';

import generateTBCParticipants from './generateTBCParticipants';

export function splitAndPadMissingParticipants(
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
