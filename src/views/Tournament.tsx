import * as React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Tournament, TournamentRoundMatchup } from 'types/Tournament';
import { AppSettingKey, AppSettingValue } from 'types/AppSetting';

import {
  BracketInformationOptions,
  DEFAULT_ACTIVE_OPTION
} from 'components/BracketInformation/BracketInformationOptions';
import BracketInformationComponent from 'components/BracketInformation';

import BracketDisplay from 'components/BracketDisplay';
import { getTournamentWinner } from 'components/BracketDisplay/utils';
import LoadingDisplay from 'components/LoadingDisplay';
import MatchupDisplay from 'components/MatchupDisplay';
import ResultsDisplay from 'components/ResultsDisplay';

import { AppContext } from 'context/index';

import reducer, { TournamentState } from 'reducers/tournament';

import classNames from 'utils/classNames';

import './Tournament.css';

const DEFAULT_STATE: TournamentState = {
  dirty: false,
  loading: true,
  settings: new Map<AppSettingKey, AppSettingValue>([]),
  errorMessages: new Map<string, string>([]),
  information: null,
  participants: [],
  matchups: [],
  rounds: [],
  selectedMatch: null
};

function Tournament() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [activeOption, setActiveOption] = React.useState(DEFAULT_ACTIVE_OPTION);
  const [data, dispatch] = React.useReducer(reducer, DEFAULT_STATE);

  const navigate = useNavigate();
  const { key: locationKey } = useLocation(); // will be different for each navigate!
  const { tournamentId } = useParams<{ tournamentId: string }>();

  React.useEffect(() => {
    setActiveOption(DEFAULT_ACTIVE_OPTION);

    dispatch({
      type: 'LOAD_SETTINGS',
      data: window.Champion.getSettings()
    });

    dispatch({
      type: 'LOAD_TOURNAMENT',
      data: window.Champion.getTournament(tournamentId)
    });
  }, [tournamentId, locationKey]);

  function save() {
    const response = window.Champion.saveTournament(data.information);

    if (response.success) {
      navigate(`/tournament/${response.tournamentId}`);
    } else {
      dispatch({ type: 'SET_ERROR', data: response.errorMessages });
    }
  }

  function deleteTournament() {
    const response = window.Champion.deleteTournament(tournamentId);

    if (response.success) {
      navigate(`/`);
    } else {
      dispatch({ type: 'SET_ERROR', data: response.errorMessages });
    }
  }

  function onPostMatchResult(match: TournamentRoundMatchup) {
    const response = window.Champion.saveTournamentMatchResult(match);

    if (response.success) {
      navigate(`/tournament/${response.tournamentId}`);
    } else {
      dispatch({ type: 'SET_ERROR', data: response.errorMessages });
    }
  }

  const bracketRounds = data.rounds;
  const hasWinner = !!getTournamentWinner(bracketRounds);
  const isResultsOption = activeOption === BracketInformationOptions.Results;
  console.log('<Tournament> :: ', { data, tournamentId });

  if (!data.information) {
    return null; // Information default is null...
  }

  return (
    <LoadingDisplay isLoading={data.loading}>
      <AppContext.Provider
        value={{
          dirty: data.dirty,
          saving: false, // There isn't any long saving process here, update if needed
          settings: data.settings,
          information: data.information,
          participants: data.participants,
          errorMessages: data.errorMessages,
          dispatch,
          save,
          delete: deleteTournament
        }}
      >
        <main
          className={classNames(
            'Tournament',
            isCollapsed && 'Tournament--BracketFill'
          )}
        >
          <BracketInformationComponent
            isCompleteTournament={hasWinner}
            activeValue={activeOption}
            isCollapsed={isCollapsed}
            onSelectOption={setActiveOption}
            onToggleCollapse={() => setIsCollapsed((p) => !p)}
          />
          {isResultsOption ? (
            <ResultsDisplay
              information={data.information}
              rounds={bracketRounds}
            />
          ) : data.selectedMatch ? (
            <MatchupDisplay
              match={data.selectedMatch}
              onPostResults={onPostMatchResult}
              onCloseDisplay={() =>
                dispatch({ type: 'SET_SELECTED_MATCH', data: null })
              }
            />
          ) : (
            <BracketDisplay
              rounds={bracketRounds}
              onMatchSelect={(data) =>
                dispatch({ type: 'SET_SELECTED_MATCH', data })
              }
            />
          )}
        </main>
      </AppContext.Provider>
    </LoadingDisplay>
  );
}

export default Tournament;
