import { Participant } from 'types/Participant';
import { Round } from 'types/Round';

import {
  FinalsRoundName,
  QualifierRoundName,
  UnconfirmedParticipantText
} from 'constants/index';

export const isPlaceholder = <T extends Participant>(p: T) =>
  p.text === UnconfirmedParticipantText;

export const isQualifierRound = <T extends Round>(r: T) =>
  r.name === QualifierRoundName;

export const isFinalRound = <T extends Round>(r: T) =>
  r.name === FinalsRoundName;
