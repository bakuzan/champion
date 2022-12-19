import { BracketMatchup } from 'types/BracketMatchup';
import { BracketParticipant } from 'types/BracketParticipant';
import { ParticipantPlus } from 'types/Participant';
import {
  TournamentParticipant,
  TournamentRoundMatchup
} from 'types/Tournament';

export function isBracketParticipant(
  participant: ParticipantPlus
): participant is BracketParticipant {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = participant as any;
  return 'bracketTemplateId' in p || ('id' in p && typeof p.id === 'string');
}

export function isBracketParticipantList(
  list: ParticipantPlus[]
): list is BracketParticipant[] {
  const p = list[0];
  return isBracketParticipant(p);
}

export function isTournamentParticipant(
  participant: ParticipantPlus
): participant is TournamentParticipant {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return 'tournamentId' in participant;
}

export function isBracketMatchup(
  match: TournamentRoundMatchup | BracketMatchup
): match is BracketMatchup {
  return !('tournamentId' in match);
}
