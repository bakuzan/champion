import { contextBridge } from 'electron';

import * as api from './api';

import { BracketTemplate } from 'types/BracketTemplate';

// Create the api to expose to the renderer
contextBridge.exposeInMainWorld('Champion', {
  ping: () => console.log(`Main is connected.`),
  getBracketTemplate: (templateId: string | number) =>
    api.getBracketTemplate(templateId),
  saveBracketTemplate: (payload: BracketTemplate) =>
    api.saveBracketTemplate(payload)
});
