import { BracketMatchup } from './BracketMatchup';
import { Round } from './Round';

export interface BracketRound extends Round {
  matchups: BracketMatchup[];
}
