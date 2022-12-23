import { AppSetting, AppSettingsMap } from 'types/AppSetting';
import { SaveSettingsResponse } from 'types/Responses';

export default function validateSaveSettingsRequest(
  request: AppSettingsMap
): [SaveSettingsResponse, AppSetting[]] {
  const errorMessages = new Map<string, string>([]);
  const settings: AppSetting[] = [];

  const inputs = Array.from(request);
  for (const [key, value] of inputs) {
    if (value === null || value === undefined) {
      errorMessages.set(key, `${key} setting is required`);
    } else {
      settings.push({ key, value: value.toString() });
    }
  }

  return [{ success: errorMessages.size === 0, errorMessages }, settings];
}
