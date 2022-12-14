import {
  Tournament,
  TournamentMatchup,
  TournamentParticipant,
  TournamentRound
} from './Tournament';

export interface SingleEliminationTournament extends Tournament {
  participants: TournamentParticipant[];
  matchups: TournamentMatchup[];
  rounds: TournamentRound[];
}
