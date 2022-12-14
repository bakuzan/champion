import { Information } from './Information';

import { BracketTemplate } from './BracketTemplate';
import { ParticipantPlus } from './Participant';

export type AppActionType =
  | 'LOAD_DATA'
  | 'UPDATE_INFORMATION'
  | 'ADD_PARTICIPANT'
  | 'UPDATE_PARTICIPANT'
  | 'REMOVE_PARTICIPANT'
  | 'SET_ERROR';

export type AppAction =
  | { type: 'LOAD_DATA'; data: BracketTemplate }
  | { type: 'UPDATE_INFORMATION'; data: Information }
  | { type: 'ADD_PARTICIPANT'; data: ParticipantPlus }
  | { type: 'UPDATE_PARTICIPANT'; data: ParticipantPlus }
  | { type: 'REMOVE_PARTICIPANT'; uid: number | string }
  | { type: 'SET_ERROR'; data: Map<string, string> };
