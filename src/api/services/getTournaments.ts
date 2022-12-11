import db from '../database';

import getStoredProceedure from 'api/database/storedProceedures';

export function getTournaments() {
  const query = getStoredProceedure('GetTournamentsWithProgressInfo');
  return db.prepare(query).all();
}
