import * as React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import BracketInformationComponent from 'components/BracketInformation';
import BracketDisplay from 'components/BracketDisplay';
import LoadingDisplay from 'components/LoadingDisplay';

import { AppContext } from 'context/index';
import { buildRounds } from 'builder/index';

import reducer, { AppState } from 'reducers/bracketCreator';

import classNames from 'utils/classNames';

import './BracketCreator.css';

const DEFAULT_STATE: AppState = {
  dirty: false,
  loading: true,
  errorMessages: new Map<string, string>(),
  information: { name: '', description: '' },
  participants: [
    {
      id: '1342be4e-b369-47f0-a46f-07a13c7c8244',
      text: 'First',
      imageUrl: null
    },
    {
      id: '819326e6-42f8-46d0-b0ea-290510a1e486',
      text: 'Second',
      imageUrl: null
    },
    {
      id: '344803c7-fe57-4f08-9804-1c962b2aa400',
      text: 'Third',
      imageUrl: null
    },
    {
      id: 'd5047874-531c-4075-957f-cfbce574e694',
      text: 'Fourth',
      imageUrl: null
    },
    {
      id: '6225609b-8913-4b3b-92ad-a3ca1ec2f334',
      text: 'Fifth',
      imageUrl: null
    },
    {
      id: '904a14c4-9d55-423e-bf03-2886961b6868',
      text: 'Sixth',
      imageUrl: null
    },
    {
      id: '782f4569-3b04-4ea4-9e87-3c38d65fbf4c',
      text: 'Seventh',
      imageUrl: null
    },
    {
      id: 'a9e33ca6-e576-418e-82de-6138aaeaf638',
      text: 'Eighth',
      imageUrl: null
    },
    {
      id: '74efeeb1-3e1c-4bc9-97c3-5e119996990e',
      text: 'Nineth',
      imageUrl: null
    },
    {
      id: '708221b4-d5ce-4168-844f-9602af045911',
      text: 'Tenth',
      imageUrl: null
    }
  ]
    .map((x, i) => ({ ...x, seedOrder: i }))
    .slice(0, 7) // DEV DATA
};

function BracketCreator() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [data, dispatch] = React.useReducer(reducer, DEFAULT_STATE);

  const navigate = useNavigate();
  const { key: locationKey } = useLocation(); // will be different for each navigate!
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
  }, [templateId, locationKey]);

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

  function startTournament() {
    const response = window.Champion.createTournament(data.information.id);

    if (response.success) {
      navigate(`/tournament/${response.tournamentId}`);
    } else {
      dispatch({ type: 'SET_ERROR', data: response.errorMessages });
    }
  }

  const bracketRounds = buildRounds(data.participants);
  console.log('<BracketCreator> :: ', { data, templateId });

  return (
    <LoadingDisplay isLoading={data.loading}>
      <AppContext.Provider
        value={{
          dirty: data.dirty,
          information: data.information,
          participants: data.participants,
          errorMessages: data.errorMessages,
          dispatch,
          save,
          startTournament
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
          <BracketDisplay rounds={bracketRounds} />
        </main>
      </AppContext.Provider>
    </LoadingDisplay>
  );
}

export default BracketCreator;
