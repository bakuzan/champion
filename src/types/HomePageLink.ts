export interface HomePageLink {
  id: number;
  name: string;
  description: string;
  /* Values only on tournament object */
  createdAt?: string;
  participantCount?: number;
  currentRoundNumber?: number;
  finalRoundNumber?: number;
  isComplete?: number; // boolean, 0/1
}
