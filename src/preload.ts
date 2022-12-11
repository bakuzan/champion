import { contextBridge } from 'electron';

import * as api from './api';

import { BracketTemplate } from 'types/BracketTemplate';

// Create the api to expose to the renderer
contextBridge.exposeInMainWorld('Champion', {
  ping: () => console.log(`Main is connected.`),
  /* Bracket Templates */
  getBracketTemplates: () => api.getBracketTemplates(),
  getBracketTemplate: (templateId: string | number) =>
    api.getBracketTemplate(templateId),
  saveBracketTemplate: (payload: BracketTemplate) =>
    api.saveBracketTemplate(payload),
  /* Tournaments */
  getTournaments: () => api.getTournaments(),
  createTournament: (bracketTemplateId: number) =>
    api.createTournament(bracketTemplateId)
});
