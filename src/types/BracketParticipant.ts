import { Participant } from './Participant';

export interface BracketParticipant extends Participant {
  id?: number;
  key: string;
  seedOrder?: number;
  bracketTemplateId?: number;
}
