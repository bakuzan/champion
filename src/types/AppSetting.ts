export interface AppSetting {
  key: string;
  value: string;
}

export type AppSettingValue = string | number | boolean;
export type AppSettingsMap = Map<string, AppSettingValue>;
