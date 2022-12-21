import * as React from 'react';

import { AppAction } from 'types/AppAction';
import { BracketParticipant } from 'types/BracketParticipant';
import { Information } from 'types/Information';
import { TournamentParticipant } from 'types/Tournament';

export interface AppContextProps {
  dirty: boolean;
  information: Information & { id?: number };
  participants: BracketParticipant[] | TournamentParticipant[];
  errorMessages: Map<string, string>;
  dispatch: React.Dispatch<AppAction>;
  save: () => void;
  delete: () => void;
  startTournament?: () => void;
}

export const AppContext = React.createContext<AppContextProps>(null);
