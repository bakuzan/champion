export interface HomePageLink {
  id: number;
  name: string;
  description: string;
  createdAt?: string;
}

export type BracketTemplateHomePageLink = HomePageLink

export interface TournamentHomePageLink extends HomePageLink {
  participantCount?: number;
  currentRoundNumber?: number;
  finalRoundNumber?: number;
  isComplete?: number; // boolean, 0/1
}
