import { BracketParticipant } from 'types/BracketParticipant';
import { BracketRound } from 'types/BracketRound';

import {
  QualifierRoundName,
  UnconfirmedParticipantText
} from 'constants/index';

export const isPlaceholder = (p: BracketParticipant) =>
  p.text === UnconfirmedParticipantText;

export const isQualifierRound = (r: BracketRound) =>
  r.name === QualifierRoundName;
