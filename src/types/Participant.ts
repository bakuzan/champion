export interface Participant {
  text: string;
  imageUrl?: string;
}

export type ParticipantPlus = Participant & { id?: number; key?: string };
