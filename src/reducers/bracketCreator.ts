import { AppAction } from 'types/AppAction';
import { AppSettingsMap } from 'types/AppSetting';
import { BracketInformation } from 'types/BracketInformation';
import { BracketParticipant } from 'types/BracketParticipant';

export interface AppState {
  dirty: boolean;
  loading: boolean;
  saving: boolean;
  settings: AppSettingsMap;
  information: BracketInformation;
  participants: BracketParticipant[];
  errorMessages: Map<string, string>;
}

function setSeedOrder(x: BracketParticipant, i: number) {
  return { ...x, seedOrder: i };
}

export default function reducer(state: AppState, action: AppAction) {
  switch (action.type) {
    case 'LOAD_SETTINGS':
      return {
        ...state,
        settings: action.data
      };
    case 'LOAD_DATA': {
      const { participants, ...information } = action.data;
      return {
        ...state,
        dirty: false,
        loading: false,
        saving: false,
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
        participants: [
          ...state.participants,
          { ...action.data, seedOrder: state.participants.length }
        ]
      };
    case 'UPDATE_PARTICIPANT':
      return {
        ...state,
        dirty: true,
        participants: state.participants.map((x) =>
          x.id !== action.data.id ? x : action.data
        )
      };
    case 'UPDATE_PARTICIPANTS':
      return {
        ...state,
        dirty: true,
        participants: action.data.map(setSeedOrder)
      };
    case 'REMOVE_PARTICIPANT':
      return {
        ...state,
        dirty: true,
        participants: state.participants
          .filter((x) => x.id !== action.uid)
          .map(setSeedOrder)
      };
    case 'SAVING':
      return { ...state, saving: true };
    case 'SET_ERROR':
      return {
        ...state,
        saving: false,
        errorMessages: action.data
      };
    default:
      return { ...state };
  }
}
