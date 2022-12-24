export type AppSettingKey = 'showSeedOrder' | 'winnerCrownColour';
export type AppSettingValue = string | number | boolean;

export type AppSettingsMap = Map<AppSettingKey, AppSettingValue>;

export interface AppSetting {
  key: AppSettingKey;
  value: string;
}
