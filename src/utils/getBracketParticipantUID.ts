import { BracketParticipant } from 'types/BracketParticipant';

const getUID = (data: BracketParticipant) => data.id ?? data.key;

export default getUID;
