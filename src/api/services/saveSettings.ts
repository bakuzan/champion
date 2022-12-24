import db from '../database';

import { AppSetting, AppSettingsMap } from 'types/AppSetting';

import validateSaveSettingsRequest from './helpers/validateSaveSettingsRequest';

export default function saveSettings(payload: AppSettingsMap) {
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
