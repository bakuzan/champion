import { Participant } from './Participant';

export interface Matchup<T extends Participant> {
  participantOne: T;
  participantTwo: T;
}
