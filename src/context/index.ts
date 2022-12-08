import * as React from 'react';

import { AppAction } from 'types/AppAction';
import { BracketInformation } from 'types/BracketInformation';
import { BracketParticipant } from 'types/BracketParticipant';

export interface AppContextProps {
  dirty: boolean;
  information: BracketInformation;
  participants: BracketParticipant[];
  errorMessages: Map<string, string>;
  dispatch: React.Dispatch<AppAction>;
  save: () => void;
  startTournament: () => void;
}

export const AppContext = React.createContext<AppContextProps>(null);
