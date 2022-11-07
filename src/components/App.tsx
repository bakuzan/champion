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
  participants: [
    {
      key: '1342be4e-b369-47f0-a46f-07a13c7c8244',
      text: 'First',
      imageUrl: null
    },
    {
      key: '819326e6-42f8-46d0-b0ea-290510a1e486',
      text: 'Second',
      imageUrl: null
    },
    {
      key: '344803c7-fe57-4f08-9804-1c962b2aa400',
      text: 'Third',
      imageUrl: null
    },
    {
      key: 'd5047874-531c-4075-957f-cfbce574e694',
      text: 'Fourth',
      imageUrl: null
    },
    {
      key: '6225609b-8913-4b3b-92ad-a3ca1ec2f334',
      text: 'Fifth',
      imageUrl: null
    },
    {
      key: '904a14c4-9d55-423e-bf03-2886961b6868',
      text: 'Sixth',
      imageUrl: null
    },
    {
      key: '782f4569-3b04-4ea4-9e87-3c38d65fbf4c',
      text: 'Seventh',
      imageUrl: null
    },
    {
      key: 'a9e33ca6-e576-418e-82de-6138aaeaf638',
      text: 'Eighth',
      imageUrl: null
    },
    {
      key: '74efeeb1-3e1c-4bc9-97c3-5e119996990e',
      text: 'Nineth',
      imageUrl: null
    },
    {
      key: '708221b4-d5ce-4168-844f-9602af045911',
      text: 'Tenth',
      imageUrl: null
    }
  ] // DEV DATA
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
