import { AppSettingsMap } from 'types/AppSetting';
import { BracketTemplate } from 'types/BracketTemplate';
import { HomePageLink } from 'types/HomePageLink';
import {
  SaveBracketTemplateResponse,
  CreateTournamentResponse,
  SaveTournamentResponse,
  DeleteTournamentResponse,
  DeleteBracketTemplateResponse,
  SaveSettingsResponse
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
  deleteBracketTemplate(
    templateId: string | number
  ): DeleteBracketTemplateResponse;
  /* Tournament endpoints */
  getTournaments(): HomePageLink[];
  getTournament(tourneyId: string | number): SingleEliminationTournament;
  createTournament(bracketTemplateId: number): CreateTournamentResponse;
  saveTournament(payload: Tournament): SaveTournamentResponse;
  deleteTournament(tournamentId: string | number): DeleteTournamentResponse;
  /* Tournament Match endpoints */
  saveTournamentMatchResult(
    match: TournamentRoundMatchup
  ): SaveTournamentResponse;
  /* AppSettings endpoints */
  getSettings(): AppSettingsMap;
  saveSettings(payload: AppSettingsMap): SaveSettingsResponse;
}

declare global {
  interface Window {
    Champion: ChampionApi;
  }
}
