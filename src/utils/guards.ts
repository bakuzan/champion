import { BracketMatchup } from 'types/BracketMatchup';
import { BracketParticipant } from 'types/BracketParticipant';
import { HomePageLink, TournamentHomePageLink } from 'types/HomePageLink';
import { ParticipantPlus } from 'types/Participant';
import {
  CreateTournamentResponse,
  SaveBracketTemplateResponse
} from 'types/Responses';
import {
  TournamentParticipant,
  TournamentRoundMatchup
} from 'types/Tournament';

/* BracketParticipant */
export function isBracketParticipant(
  participant: ParticipantPlus
): participant is BracketParticipant {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = participant as any;
  return (
    !p || 'bracketTemplateId' in p || ('id' in p && typeof p.id === 'string')
  );
}

export function isBracketParticipantList(
  list: ParticipantPlus[]
): list is BracketParticipant[] {
  const p = list[0];
  return isBracketParticipant(p);
}

/* TournamentParticipant */
export function isTournamentParticipant(
  participant: ParticipantPlus
): participant is TournamentParticipant {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return 'tournamentId' in participant;
}

/* BracketMatchup */
export function isBracketMatchup(
  match: TournamentRoundMatchup | BracketMatchup
): match is BracketMatchup {
  return !('tournamentId' in match);
}

/* SaveBracketTemplateResponse */
export function isSaveBracketTemplateResponse(
  response: SaveBracketTemplateResponse | CreateTournamentResponse
): response is SaveBracketTemplateResponse {
  return 'bracketTemplateId' in response;
}

/* HomePageLink */
export function isTournamentHomePageLink(
  homePageLink: HomePageLink
): homePageLink is TournamentHomePageLink {
  return 'isComplete' in homePageLink;
}
