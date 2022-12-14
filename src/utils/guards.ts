import { ParticipantPlus } from 'types/Participant';
import { TournamentParticipant } from 'types/Tournament';

export function isTournamentParticipant(
  participant: ParticipantPlus
): participant is TournamentParticipant {
  return !!(participant as any).tournamentId;
}
