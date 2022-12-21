import db from '../database';
import { getCurrentTimestamp } from './helpers/common';

export default function deleteTournament(tourneyId: string | number) {
  const tournamentId = Number(tourneyId);
  if (isNaN(tournamentId)) {
    throw new Error(
      'Invalid BracketTemplate Id passed to api.deleteTournament'
    );
  }

  db.prepare(
    `UPDATE Tournament 
        SET isDeleted = 1
          , deletedAt = @deletedAt 
      WHERE id = @tournamentId`
  ).run({ tournamentId, deletedAt: getCurrentTimestamp() });

  return { success: true, errorMessages: new Map<string, string>([]) };
}
