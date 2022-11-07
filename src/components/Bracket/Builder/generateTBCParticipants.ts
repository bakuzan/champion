import { BracketParticipant } from 'types/BracketParticipant';

const emptyParticipant: BracketParticipant = {
  key: 'placeholder',
  text: 'TBC'
};

export default function generateTBCParticipants(
  count: number
): BracketParticipant[] {
  return Array(count)
    .fill(null)
    .map(() => ({ ...emptyParticipant }));
}
