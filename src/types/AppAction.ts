import { BracketInformation } from './BracketInformation';
import { BracketParticipant } from './BracketParticipant';
import { BracketTemplate } from './BracketTemplate';

export type AppActionType =
  | 'LOAD_DATA'
  | 'UPDATE_INFORMATION'
  | 'ADD_PARTICIPANT'
  | 'UPDATE_PARTICIPANT'
  | 'REMOVE_PARTICIPANT';

export type AppAction =
  | { type: 'LOAD_DATA'; data: BracketTemplate }
  | { type: 'UPDATE_INFORMATION'; data: BracketInformation }
  | { type: 'ADD_PARTICIPANT'; data: BracketParticipant }
  | { type: 'UPDATE_PARTICIPANT'; data: BracketParticipant }
  | { type: 'REMOVE_PARTICIPANT'; uid: number | string };
