import db from '../database';

import { Tournament } from 'types/Tournament';

import validateSaveTournamentRequest from './helpers/validateSaveTournamentRequest';

export default function saveTournament(payload: Tournament) {
  const tournamentId = payload.id;
  console.log('API: saveTournament :: ', payload);
  const response = validateSaveTournamentRequest(payload);
  if (!response.success) {
    return response;
  }

  const updateTournament = db.prepare(
    `UPDATE Tournament
        SET name = @name
          , description = @description 
      WHERE id = @id`
  );

  updateTournament.run(payload);

  response.tournamentId = tournamentId;
  return response;
}
