import { Matchup } from './Matchup';
import { Participant } from './Participant';
import { Round } from './Round';

export interface Tournament {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  includePlayoff?: number;
}

export interface TournamentParticipant extends Participant {
  id: number;
  seedOrder: number;
  tournamentId: number;
}

export interface TournamentMatchup {
  tournamentId: number;
  roundNumber: number;
  roundMatchNumber: number;
  participantOneId?: number;
  participantOneScore: number;
  participantTwoId?: number;
  participantTwoScore: number;
}

export interface TournamentRoundMatchup
  extends TournamentMatchup,
    Matchup<TournamentParticipant> {}

export interface TournamentRound extends Round {
  matchups: TournamentRoundMatchup[];
}
