import * as React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import {
  Tournament,
  TournamentMatchup,
  TournamentParticipant,
  TournamentRound
} from 'types/Tournament';
import { SingleEliminationTournament } from 'types/SingleEliminationTournament';
import { AppAction } from 'types/AppAction';

import BracketInformationComponent from 'components/BracketInformation';
import BracketDisplay from 'components/BracketDisplay';
import LoadingDisplay from 'components/LoadingDisplay';

import { AppContext } from 'context/index';

import classNames from 'utils/classNames';

import './Tournament.css';

type TournamentAction = {
  type: 'LOAD_TOURNAMENT';
  data: SingleEliminationTournament;
};

interface TournamentState {
  dirty: boolean;
  loading: boolean;
  information: Tournament;
  participants: TournamentParticipant[];
  matchups: TournamentMatchup[];
  rounds: TournamentRound[];
  errorMessages: Map<string, string>;
}

function reducer(state: TournamentState, action: AppAction | TournamentAction) {
  switch (action.type) {
    case 'LOAD_TOURNAMENT': {
      const { participants, matchups, rounds, ...information } = action.data;
      return {
        ...state,
        dirty: false,
        loading: false,
        information,
        participants,
        matchups,
        rounds,
        errorMessages: new Map<string, string>([])
      };
    }
    case 'UPDATE_INFORMATION':
      return {
        ...state,
        dirty: true,
        information: { ...state.information, ...action.data }
      };
    case 'SET_ERROR':
      return {
        ...state,
        errorMessages: action.data
      };
    default:
      return { ...state };
  }
}

const DEFAULT_STATE: TournamentState = {
  dirty: false,
  loading: true,
  errorMessages: new Map<string, string>(),
  information: null,
  participants: [],
  matchups: [],
  rounds: []
};

function Tournament() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [data, dispatch] = React.useReducer(reducer, DEFAULT_STATE);

  const { key: locationKey } = useLocation(); // will be different for each navigate!
  const { tournamentId } = useParams<{ tournamentId: string }>();

  React.useEffect(() => {
    dispatch({
      type: 'LOAD_TOURNAMENT',
      data: window.Champion.getTournament(tournamentId)
    });
  }, [tournamentId, locationKey]);

  function save() {
    console.log('Save Tournament not implemented yet!');
  }

  const bracketRounds = data.rounds;
  console.log('<Tournament> :: ', { data, tournamentId });

  if (!data.information) {
    return null; // Information default is null...
  }

  return (
    <LoadingDisplay isLoading={data.loading}>
      <AppContext.Provider
        value={{
          dirty: data.dirty,
          information: data.information,
          participants: data.participants,
          errorMessages: data.errorMessages,
          dispatch,
          save
        }}
      >
        <main
          className={classNames(
            'Tournament',
            isCollapsed && 'Tournament--BracketFill'
          )}
        >
          <BracketInformationComponent
            isCollapsed={isCollapsed}
            onToggleCollapse={() => setIsCollapsed((p) => !p)}
          />
          <BracketDisplay rounds={bracketRounds} />
        </main>
      </AppContext.Provider>
    </LoadingDisplay>
  );
}

export default Tournament;
