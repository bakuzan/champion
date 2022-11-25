export interface ChampionApi {
  ping(): void;
  saveBracketTemplate(payload: BracketTemplate): number;
}

declare global {
  interface Window {
    Champion: ChampionApi;
  }
}
