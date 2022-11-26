import { BracketParticipant } from 'types/BracketParticipant';
import { BracketInformation } from 'types/BracketInformation';

export interface BracketTemplate extends BracketInformation {
  participants: BracketParticipant[];
}
