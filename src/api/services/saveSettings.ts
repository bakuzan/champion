import db from '../database';

import { AppSetting } from 'types/AppSetting';

import validateSaveSettingsRequest from './helpers/validateSaveSettingsRequest';

export default function saveSettings(payload: Map<string, any>) {
  const [response, settings] = validateSaveSettingsRequest(payload);
  if (!response.success) {
    return response;
  }

  const updateSetting = db.prepare(`
    UPDATE AppSetting
       SET value = @value
     WHERE key = @key`);

  const updateSettings = db.transaction((items: AppSetting[]) => {
    for (const item of items) {
      updateSetting.run(item);
    }
  });

  updateSettings(settings);

  return response;
}
