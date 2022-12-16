import { AppAction } from 'types/AppAction';
import { BracketInformation } from 'types/BracketInformation';
import { BracketParticipant } from 'types/BracketParticipant';

import getUID from 'utils/getBracketParticipantUID';

export interface AppState {
  dirty: boolean;
  loading: boolean;
  information: BracketInformation;
  participants: BracketParticipant[];
  errorMessages: Map<string, string>;
}

export default function reducer(state: AppState, action: AppAction) {
  switch (action.type) {
    case 'LOAD_DATA': {
      const { participants, ...information } = action.data;
      return {
        ...state,
        dirty: false,
        loading: false,
        information,
        participants,
        errorMessages: new Map<string, string>([])
      };
    }
    case 'UPDATE_INFORMATION':
      return {
        ...state,
        dirty: true,
        information: { ...state.information, ...action.data }
      };
    case 'ADD_PARTICIPANT':
      return {
        ...state,
        dirty: true,
        participants: [...state.participants, action.data]
      };
    case 'UPDATE_PARTICIPANT':
      return {
        ...state,
        dirty: true,
        participants: state.participants.map((x) =>
          getUID(x) !== getUID(action.data) ? x : action.data
        )
      };
    case 'REMOVE_PARTICIPANT':
      return {
        ...state,
        dirty: true,
        participants: state.participants.filter((x) => getUID(x) !== action.uid)
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
