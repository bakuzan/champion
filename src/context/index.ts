import * as React from 'react';

import { AppAction } from 'types/AppAction';
import { Information } from 'types/Information';
import { ParticipantPlus } from 'types/Participant';

export interface AppContextProps {
  dirty: boolean;
  information: Information & { id?: number };
  participants: ParticipantPlus[];
  errorMessages: Map<string, string>;
  dispatch: React.Dispatch<AppAction>;
  save: () => void;
  startTournament?: () => void;
}

export const AppContext = React.createContext<AppContextProps>(null);
