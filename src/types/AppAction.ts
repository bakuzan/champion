import { BracketInformation } from './BracketInformation';
import { BracketParticipant } from './BracketParticipant';

export type AppActionType =
  | 'UPDATE_INFORMATION'
  | 'ADD_PARTICIPANT'
  | 'UPDATE_PARTICIPANT'
  | 'REMOVE_PARTICIPANT';

export type AppAction =
  | { type: 'UPDATE_INFORMATION'; data: BracketInformation }
  | { type: 'ADD_PARTICIPANT'; data: BracketParticipant }
  | { type: 'UPDATE_PARTICIPANT'; data: BracketParticipant }
  | { type: 'REMOVE_PARTICIPANT'; key: string };
