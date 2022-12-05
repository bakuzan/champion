interface BaseResponse {
  success: boolean;
  errorMessages: Map<string, string>;
}

export interface SaveBracketTemplateResponse extends BaseResponse {
  bracketTemplateId?: number;
}
