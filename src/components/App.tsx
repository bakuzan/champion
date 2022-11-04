import * as React from 'react';

import BracketInformationComponent from './BracketInformation';
import Bracket from './Bracket';

import { AppContext } from 'context/index';

import { AppAction } from 'types/AppAction';
import { BracketInformation } from 'types/BracketInformation';
import { BracketParticipant } from 'types/BracketParticipant';

import classNames from 'utils/classNames';

import './App.css';

interface AppState {
  information: BracketInformation;
  participants: BracketParticipant[];
}

function reducer(state: AppState, action: AppAction) {
  switch (action.type) {
    case 'UPDATE_INFORMATION':
      return {
        ...state,
        information: { ...state.information, ...action.data }
      };
    case 'ADD_PARTICIPANT':
      return {
        ...state,
        participants: [...state.participants, action.data]
      };
    case 'UPDATE_PARTICIPANT':
      return {
        ...state,
        participants: state.participants.map((x) =>
          x.key !== action.data.key ? x : action.data
        )
      };
    case 'REMOVE_PARTICIPANT':
      return {
        ...state,
        participants: state.participants.filter((x) => x.key !== action.key)
      };
    default:
      return { ...state };
  }
}

const DEFAULT_STATE: AppState = {
  information: { name: '', description: '' },
  participants: []
};

function App() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [data, dispatch] = React.useReducer(reducer, DEFAULT_STATE);
  console.log('<App> :: ', data);
  return (
    <AppContext.Provider
      value={{
        information: data.information,
        participants: data.participants,
        dispatch
      }}
    >
      <main className={classNames('App', isCollapsed && 'App--BracketFill')}>
        <BracketInformationComponent
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed((p) => !p)}
        />
        <Bracket />
      </main>
    </AppContext.Provider>
  );
}

export default App;
