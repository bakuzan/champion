import { Information } from './Information';
import { BracketTemplate } from './BracketTemplate';
import { BracketParticipant } from './BracketParticipant';
import { SingleEliminationTournament } from './SingleEliminationTournament';
import { TournamentRoundMatchup } from './Tournament';

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
  | { type: 'ADD_PARTICIPANT'; data: BracketParticipant }
  | { type: 'UPDATE_PARTICIPANT'; data: BracketParticipant }
  | { type: 'REMOVE_PARTICIPANT'; uid: number | string }
  | { type: 'SET_ERROR'; data: Map<string, string> };

export type TournamentActionType = 'LOAD_TOURNAMENT' | 'SET_SELECTED_MATCH';

export type TournamentAction =
  | {
      type: 'LOAD_TOURNAMENT';
      data: SingleEliminationTournament;
    }
  | { type: 'SET_SELECTED_MATCH'; data: TournamentRoundMatchup | null };
