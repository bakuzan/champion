import { BracketMatchup } from 'types/BracketMatchup';
import { ParticipantPlus } from 'types/Participant';
import {
  TournamentParticipant,
  TournamentRoundMatchup
} from 'types/Tournament';

export function isTournamentParticipant(
  participant: ParticipantPlus
): participant is TournamentParticipant {
  return !!(participant as any).tournamentId;
}

export function isBracketMatchup(
  match: TournamentRoundMatchup | BracketMatchup
): match is BracketMatchup {
  return !('tournamentId' in match);
}