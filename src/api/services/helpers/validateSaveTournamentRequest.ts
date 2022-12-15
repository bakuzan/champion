import { SaveTournamentResponse } from 'types/Responses';
import { Tournament } from 'types/Tournament';

import { isNullOrEmpty } from './common';

export default function validateSaveTournamentRequest(
  payload: Tournament
): SaveTournamentResponse {
  const errorMessages = new Map<string, string>([]);
  let success = true;

  if (isNullOrEmpty(payload.name)) {
    errorMessages.set('name', 'Tournament Name is required.');
    success = false;
  }

  return { success, errorMessages, tournamentId: payload.id };
}
