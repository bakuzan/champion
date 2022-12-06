import { BracketInformation } from 'types/BracketInformation';
import { BracketTemplate } from 'types/BracketTemplate';
import { SaveBracketTemplateResponse } from 'types/Responses';

export interface ChampionApi {
  ping(): void;
  getBracketTemplates(): BracketInformation[];
  getBracketTemplate(templateId: string | number): BracketTemplate;
  saveBracketTemplate(payload: BracketTemplate): SaveBracketTemplateResponse;
}

declare global {
  interface Window {
    Champion: ChampionApi;
  }
}
