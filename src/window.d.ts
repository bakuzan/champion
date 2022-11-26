import { BracketTemplate } from 'types/BracketTemplate';

export interface ChampionApi {
  ping(): void;
  getBracketTemplate(templateId: string | number): BracketTemplate;
  saveBracketTemplate(payload: BracketTemplate): number;
}

declare global {
  interface Window {
    Champion: ChampionApi;
  }
}
