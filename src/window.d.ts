import { BracketLink } from 'types/BracketInformation';
import { BracketTemplate } from 'types/BracketTemplate';
import {
  SaveBracketTemplateResponse,
  CreateTournamentResponse
} from 'types/Responses';

export interface ChampionApi {
  ping(): void;
  /* Bracket endpoints */
  getBracketTemplates(): BracketLink[];
  getBracketTemplate(templateId: string | number): BracketTemplate;
  saveBracketTemplate(payload: BracketTemplate): SaveBracketTemplateResponse;
  /* Tournament endpoints */
  createTournament(bracketTemplateId: number): CreateTournamentResponse;
}

declare global {
  interface Window {
    Champion: ChampionApi;
  }
}
