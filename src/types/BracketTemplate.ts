import { BracketParticipant } from 'types/BracketParticipant';

export interface BracketTemplate {
  id?: number;
  name: string;
  description: string;
  participants: BracketParticipant[];
}
