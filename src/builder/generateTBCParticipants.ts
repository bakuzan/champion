import { BracketParticipant } from 'types/BracketParticipant';

import { UnconfirmedParticipantText } from 'constants/index';
import generateUniqueId from 'utils/generateUniqueId';

export default function generateTBCParticipants(
  count: number
): BracketParticipant[] {
  return Array(count)
    .fill(null)
    .map(() => ({ key: generateUniqueId(), text: UnconfirmedParticipantText }));
}
