import Database from 'better-sqlite3';

import setupExecution from './setup';

const db = new Database(process.env.DATABASE_PATH, {});
const scripts = setupExecution();

for (const item of scripts) {
  db.exec(item.script);
}

export default db;
