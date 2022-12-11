import { BracketTemplate } from 'types/BracketTemplate';
import { HomePageLink } from 'types/HomePageLink';
import {
  SaveBracketTemplateResponse,
  CreateTournamentResponse
} from 'types/Responses';

export interface ChampionApi {
  ping(): void;
  /* Bracket endpoints */
  getBracketTemplates(): HomePageLink[];
  getBracketTemplate(templateId: string | number): BracketTemplate;
  saveBracketTemplate(payload: BracketTemplate): SaveBracketTemplateResponse;
  /* Tournament endpoints */
  getTournaments(): HomePageLink[];
  createTournament(bracketTemplateId: number): CreateTournamentResponse;
}

declare global {
  interface Window {
    Champion: ChampionApi;
  }
}
