// eslint-disable-next-line import/no-named-as-default
import Database from 'better-sqlite3';

import { UserVersion } from 'types/UserVersion';
import setupExecution from './setup';

const db = new Database(process.env.DATABASE_PATH, {});

// Run the scripts against the database
const { user_version }: UserVersion = db.prepare('PRAGMA user_version').get();
const scripts = setupExecution();

for (const item of scripts) {
  if (!item.migration || item.number >= user_version) {
    db.exec(item.script);
  }
}

// Update the user_version
const finalMigration = scripts
  .filter((x) => x.migration)
  .sort((a, b) => a.number - b.number)
  .pop();

const newUserVersion = finalMigration.number + 1;
db.exec(`PRAGMA user_version = ${newUserVersion}`);

export default db;
