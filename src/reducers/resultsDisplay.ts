import { ResultsDisplayAction } from 'types/AppAction';
import {
  CreateSeedOrderOption,
  CreateTypeOption
} from 'components/ResultsDisplay/createNewOptions';

export interface ResultsDisplayState {
  saving: boolean;
  createType: CreateTypeOption | null;
  createSeedOrder: CreateSeedOrderOption | null;
  errorMessages: Map<string, string>;
}

export default function reducer(
  state: ResultsDisplayState,
  action: ResultsDisplayAction
) {
  switch (action.type) {
    case 'UPDATE_OPTION':
      return { ...state, ...action.data };
    case 'SAVING':
      return { ...state, saving: true };
    case 'SET_ERROR':
      return {
        ...state,
        saving: false,
        errorMessages: action.data
      };
    default:
      return { ...state };
  }
}
