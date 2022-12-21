interface BaseResponse {
  success: boolean;
  errorMessages: Map<string, string>;
}

/* Bracket Template things */
export interface SaveBracketTemplateResponse extends BaseResponse {
  bracketTemplateId?: number;
}

export type DeleteBracketTemplateResponse = BaseResponse

/* Tournament things */
export interface CreateTournamentResponse extends BaseResponse {
  tournamentId?: number;
}

export interface SaveTournamentResponse extends BaseResponse {
  tournamentId: number;
}

export type DeleteTournamentResponse = BaseResponse
