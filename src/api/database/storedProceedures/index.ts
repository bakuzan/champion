import path from 'path';
import fs from 'fs';

import isDevelopment from '../isDevelopment';

type ChampionStoredProceedure = 'GetTournamentsWithProgressInfo';

const proceedures = {} as Record<ChampionStoredProceedure, string>;
const targetFolder = isDevelopment()
  ? path.resolve('src/api/database/storedProceedures')
  : path.join(__dirname, './');

function readSQLFiles() {
  try {
    const filenames = fs.readdirSync(targetFolder);

    return filenames
      .filter((x) => x.endsWith('sql'))
      .map((filename) => {
        const key = filename.replace('.sql', '') as ChampionStoredProceedure;
        const content = fs
          .readFileSync(path.join(targetFolder, filename), 'utf-8')
          .toString();

        proceedures[key] = content;
      });
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to read SQL files`);
  }
}

export default function getStoredProceedure(
  proceedureName: ChampionStoredProceedure
) {
  const script = proceedures[proceedureName];
  if (!script) {
    readSQLFiles();
  }

  return proceedures[proceedureName];
}
