export interface ChampionApi {
  ping(): void;
}

declare global {
  interface Window {
    Champion: ChampionApi;
  }
}
