import { AppAction, TournamentAction } from 'types/AppAction';
import {
  Tournament,
  TournamentMatchup,
  TournamentParticipant,
  TournamentRound,
  TournamentRoundMatchup
} from 'types/Tournament';

export interface TournamentState {
  dirty: boolean;
  loading: boolean;
  information: Tournament;
  participants: TournamentParticipant[];
  matchups: TournamentMatchup[];
  rounds: TournamentRound[];
  selectedMatch: TournamentRoundMatchup | null;
  errorMessages: Map<string, string>;
}

export default function reducer(
  state: TournamentState,
  action: AppAction | TournamentAction
) {
  switch (action.type) {
    case 'LOAD_TOURNAMENT': {
      const { participants, matchups, rounds, ...information } = action.data;
      return {
        ...state,
        dirty: false,
        loading: false,
        information,
        participants,
        matchups,
        rounds,
        errorMessages: new Map<string, string>([])
      };
    }
    case 'UPDATE_INFORMATION':
      return {
        ...state,
        dirty: true,
        information: { ...state.information, ...action.data }
      };
    case 'SET_SELECTED_MATCH':
      return {
        ...state,
        selectedMatch: action.data
      };
    case 'SET_ERROR':
      return {
        ...state,
        errorMessages: action.data
      };

    default:
      return { ...state };
  }
}
