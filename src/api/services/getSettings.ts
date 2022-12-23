import { AppSetting, AppSettingsMap, AppSettingValue } from 'types/AppSetting';
import db from '../database';

function parseBool(value: string) {
  const valueLower = value.toLowerCase();
  return valueLower === 'true' ? true : valueLower === 'false' ? false : value;
}

function convertAppSettingValue(value: string) {
  const asNumber = parseInt(value);
  if (!isNaN(asNumber)) {
    return asNumber;
  }

  const asBool = parseBool(value);
  if (typeof asBool === 'boolean') {
    return asBool;
  }

  return value;
}

export function getSettings(): AppSettingsMap {
  const settings: AppSetting[] = db.prepare(`SELECT * FROM AppSetting`).all();
  const mappedSettings: [string, AppSettingValue][] = settings.map((x) => [
    x.key,
    convertAppSettingValue(x.value)
  ]);

  return new Map(mappedSettings);
}
