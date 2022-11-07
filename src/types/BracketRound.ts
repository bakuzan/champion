import { BracketMatchup } from './BracketMatchup';

export interface BracketRound {
  name: string;
  matchups: BracketMatchup[];
}
