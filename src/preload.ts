import { contextBridge } from 'electron';

import * as api from './api';

import { AppSettingsMap } from 'types/AppSetting';
import { BracketTemplate } from 'types/BracketTemplate';
import { Tournament, TournamentRoundMatchup } from 'types/Tournament';
import { BracketInformation } from 'types/BracketInformation';
import { BracketParticipant } from 'types/BracketParticipant';

// Create the api to expose to the renderer
contextBridge.exposeInMainWorld('Champion', {
  ping: () => console.log(`Main is connected.`),
  /* Bracket Templates */
  getBracketTemplates: () => api.getBracketTemplates(),
  getBracketTemplate: (templateId: string | number) =>
    api.getBracketTemplate(templateId),
  saveBracketTemplate: (payload: BracketTemplate) =>
    api.saveBracketTemplate(payload),
  deleteBracketTemplate: (templateId: string | number) =>
    api.deleteBracketTemplate(templateId),
  /* Tournaments */
  getTournaments: () => api.getTournaments(),
  getTournament: (tourneyId: string | number) => api.getTournament(tourneyId),
  createTournament: (bracketTemplateId: number) =>
    api.createTournament(bracketTemplateId),
  createTournamentFromResults: (
    bracketTemplate: BracketInformation,
    bracketParticipants: BracketParticipant[]
  ) => api.createTournamentFromResults(bracketTemplate, bracketParticipants),
  saveTournament: (payload: Tournament) => api.saveTournament(payload),
  deleteTournament: (tourneyId: string | number) =>
    api.deleteTournament(tourneyId),
  /* Tournament Match endpoints */
  saveTournamentMatchResult: (match: TournamentRoundMatchup) =>
    api.saveTournamentMatchResult(match),
  /* AppSettings endpoints */
  getSettings: () => api.getSettings(),
  saveSettings: (payload: AppSettingsMap) => api.saveSettings(payload)
});
