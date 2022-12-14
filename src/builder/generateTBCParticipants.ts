import { BracketParticipant } from 'types/BracketParticipant';
import { TournamentParticipant } from 'types/Tournament';

import { UnconfirmedParticipantText } from 'constants/index';
import generateUniqueId from 'utils/generateUniqueId';

export function getTBCTournamentParticipant(
  fakeId: number
): TournamentParticipant {
  return {
    id: -fakeId,
    text: UnconfirmedParticipantText,
    seedOrder: 0,
    tournamentId: 0
  };
}

function getNewTBCParticipant() {
  return { key: generateUniqueId(), text: UnconfirmedParticipantText };
}

export default function generateTBCParticipants(
  count: number
): BracketParticipant[] {
  return Array(count)
    .fill(null)
    .map(() => getNewTBCParticipant());
}
