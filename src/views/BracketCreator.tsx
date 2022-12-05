import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BracketInformationComponent from 'components/BracketInformation';
import Bracket from 'components/Bracket';
import LoadingDisplay from 'components/LoadingDisplay';

import { AppContext } from 'context/index';

import { AppAction } from 'types/AppAction';
import { BracketInformation } from 'types/BracketInformation';
import { BracketParticipant } from 'types/BracketParticipant';

import classNames from 'utils/classNames';
import getUID from 'utils/getBracketParticipantUID';

import './BracketCreator.css';

interface AppState {
  loading: boolean;
  information: BracketInformation;
  participants: BracketParticipant[];
  errorMessages: Map<string, string>;
}

function reducer(state: AppState, action: AppAction) {
  switch (action.type) {
    case 'LOAD_DATA': {
      const { participants, ...information } = action.data;
      return {
        ...state,
        loading: false,
        information,
        participants
      };
    }
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
          getUID(x) !== getUID(action.data) ? x : action.data
        )
      };
    case 'REMOVE_PARTICIPANT':
      return {
        ...state,
        participants: state.participants.filter((x) => getUID(x) !== action.uid)
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

const DEFAULT_STATE: AppState = {
  loading: true,
  errorMessages: new Map<string, string>(),
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
  ].slice(0, 7) // DEV DATA
};

function BracketCreator() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [data, dispatch] = React.useReducer(reducer, DEFAULT_STATE);

  const navigate = useNavigate();
  const { templateId } = useParams<{ templateId: string }>();

  React.useEffect(() => {
    dispatch({
      type: 'LOAD_DATA',
      data: templateId // If id: Fetch data, else: set empty
        ? window.Champion.getBracketTemplate(templateId)
        : {
            ...DEFAULT_STATE.information,
            participants: [...DEFAULT_STATE.participants]
          }
    });
  }, [templateId]);

  function save() {
    const response = window.Champion.saveBracketTemplate({
      ...data.information,
      participants: data.participants
    });

    if (response.success) {
      navigate(`/template/${response.bracketTemplateId}`);
    } else {
      dispatch({ type: 'SET_ERROR', data: response.errorMessages });
    }
  }

  console.log('<BracketCreator> :: ', data);
  return (
    <LoadingDisplay isLoading={data.loading}>
      <AppContext.Provider
        value={{
          information: data.information,
          participants: data.participants,
          errorMessages: data.errorMessages,
          dispatch,
          save
        }}
      >
        <main
          className={classNames(
            'BracketCreator',
            isCollapsed && 'BracketCreator--BracketFill'
          )}
        >
          <BracketInformationComponent
            isCollapsed={isCollapsed}
            onToggleCollapse={() => setIsCollapsed((p) => !p)}
          />
          <Bracket />
        </main>
      </AppContext.Provider>
    </LoadingDisplay>
  );
}

export default BracketCreator;
