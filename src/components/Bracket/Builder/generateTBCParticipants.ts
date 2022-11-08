import { BracketParticipant } from 'types/BracketParticipant';
import generateUniqueId from 'utils/generateUniqueId';

export default function generateTBCParticipants(
  count: number
): BracketParticipant[] {
  return Array(count)
    .fill(null)
    .map(() => ({ key: generateUniqueId(), text: 'TBC' }));
}
