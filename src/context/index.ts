import * as React from 'react';

import { AppAction } from 'types/AppAction';
import { AppSettingsMap } from 'types/AppSetting';
import { BracketParticipant } from 'types/BracketParticipant';
import { Information } from 'types/Information';
import { TournamentParticipant } from 'types/Tournament';

export interface AppContextProps {
  dirty: boolean;
  settings: AppSettingsMap;
  information: Information & { id?: number };
  participants: BracketParticipant[] | TournamentParticipant[];
  errorMessages: Map<string, string>;
  dispatch: React.Dispatch<AppAction>;
  save: () => void;
  delete: () => void;
  startTournament?: () => void;
}

export const AppContext = React.createContext<AppContextProps>(null);
