import * as React from 'react';

import { AppAction } from 'types/AppAction';
import { BracketInformation } from 'types/BracketInformation';
import { BracketParticipant } from 'types/BracketParticipant';

export interface AppContextProps {
  information: BracketInformation;
  participants: BracketParticipant[];
  errorMessages: Map<string, string>;
  dispatch: React.Dispatch<AppAction>;
  save: () => void;
}

export const AppContext = React.createContext<AppContextProps>(null);
