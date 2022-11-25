import { contextBridge } from 'electron';

import * as api from './api';

import { BracketTemplate } from 'types/BracketTemplate';

// Create the api to expose to the renderer
contextBridge.exposeInMainWorld('Champion', {
  ping: () => console.log(`Main is connected.`),
  saveBracketTemplate: (payload: BracketTemplate) =>
    api.saveBracketTemplate(payload)
});
