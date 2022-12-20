import { BracketTemplate } from 'types/BracketTemplate';
import { HomePageLink } from 'types/HomePageLink';
import {
  SaveBracketTemplateResponse,
  CreateTournamentResponse,
  SaveTournamentResponse
} from 'types/Responses';
import { SingleEliminationTournament } from 'types/SingleEliminationTournament';
import { TournamentRoundMatchup } from 'types/Tournament';

export interface ChampionApi {
  ping(): void;
  /* Bracket endpoints */
  getBracketTemplates(): HomePageLink[];
  getBracketTemplate(templateId: string | number): BracketTemplate;
  saveBracketTemplate(
    payload: BracketTemplate
  ): Promise<SaveBracketTemplateResponse>;
  /* Tournament endpoints */
  getTournaments(): HomePageLink[];
  getTournament(tourneyId: string | number): SingleEliminationTournament;
  createTournament(bracketTemplateId: number): CreateTournamentResponse;
  saveTournament(payload: Tournament): SaveTournamentResponse;
  /* Tournament Match endpoints */
  saveTournamentMatchResult(
    match: TournamentRoundMatchup
  ): SaveTournamentResponse;
}

declare global {
  interface Window {
    Champion: ChampionApi;
  }
}
