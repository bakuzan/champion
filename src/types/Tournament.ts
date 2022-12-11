export interface Tournament {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

export interface TournamentParticipant {
  id: number;
  text: string;
  imageUrl?: string;
  seedOrder: number;
  tournamentId: number;
}

export interface TournamentMatchup {
  tournamentId: number;
  // matchCode:string; // TODO How do we know which round something is in if we don't have the code ?
  participantOneId?: number;
  participantOneScore: number;
  participantTwoId?: number;
  participantTwoScore: number;
}
