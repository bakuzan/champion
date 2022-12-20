export interface Participant {
  text: string;
  image?: string;
}

export type ParticipantPlus = Participant & {
  id?: string | number;
  key?: string;
};
