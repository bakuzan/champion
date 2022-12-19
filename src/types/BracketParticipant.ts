import { ItemInterface } from 'react-sortablejs';
import { Participant } from './Participant';

export interface BracketParticipant extends Participant, ItemInterface {
  id: string | number;
  seedOrder?: number; // Only used during tournament creation!!
  bracketTemplateId?: number;
}
