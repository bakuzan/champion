import { AppSettingsMap } from 'types/AppSetting';
import { CrownImageColour } from 'types/CrownImageColour';

export function getShowSeedOrder(dict: AppSettingsMap) {
  return (dict.get('showSeedOrder') as boolean) ?? false;
}

export function getWinnerCrownColour(dict: AppSettingsMap) {
  return (dict.get('winnerCrownColour') as CrownImageColour) ?? '';
}
