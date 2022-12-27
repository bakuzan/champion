import * as React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { AppSettingKey, AppSettingValue } from 'types/AppSetting';

import BracketInformationComponent from 'components/BracketInformation';
import BracketDisplay from 'components/BracketDisplay';
import LoadingDisplay from 'components/LoadingDisplay';

import { AppContext } from 'context/index';
import { buildRounds } from 'builder/index';

import reducer, { AppState } from 'reducers/bracketCreator';

import classNames from 'utils/classNames';

import './BracketCreator.css';
import { SaveBracketTemplateResponse } from 'types/Responses';

const DEFAULT_STATE: AppState = {
  dirty: false,
  loading: true,
  saving: false,
  settings: new Map<AppSettingKey, AppSettingValue>([]),
  errorMessages: new Map<string, string>([]),
  information: { name: '', description: '' },
  participants: [
    {
      id: '1342be4e-b369-47f0-a46f-07a13c7c8244',
      text: 'First',
      image: null
    },
    {
      id: '819326e6-42f8-46d0-b0ea-290510a1e486',
      text: 'Second',
      image: null
    },
    {
      id: '344803c7-fe57-4f08-9804-1c962b2aa400',
      text: 'Third',
      image: null
    },
    {
      id: 'd5047874-531c-4075-957f-cfbce574e694',
      text: 'Fourth',
      image: null
    },
    {
      id: '6225609b-8913-4b3b-92ad-a3ca1ec2f334',
      text: 'Fifth',
      image: null
    },
    {
      id: '904a14c4-9d55-423e-bf03-2886961b6868',
      text: 'Sixth',
      image: null
    },
    {
      id: '782f4569-3b04-4ea4-9e87-3c38d65fbf4c',
      text: 'Seventh',
      image: null
    },
    {
      id: 'a9e33ca6-e576-418e-82de-6138aaeaf638',
      text: 'Eighth',
      image: null
    },
    {
      id: '74efeeb1-3e1c-4bc9-97c3-5e119996990e',
      text: 'Nineth',
      image: null
    },
    {
      id: '708221b4-d5ce-4168-844f-9602af045911',
      text: 'Tenth',
      image: null
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
      type: 'LOAD_SETTINGS',
      data: window.Champion.getSettings()
    });

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

  async function save() {
    dispatch({ type: 'SAVING' });
    const response = await window.Champion.saveBracketTemplate({
      ...data.information,
      participants: data.participants
    });

    if (response.success) {
      navigate(`/template/${response.bracketTemplateId}`);
    } else {
      dispatch({ type: 'SET_ERROR', data: response.errorMessages });
    }
  }

  function deleteBracketTemplate() {
    const response = window.Champion.deleteBracketTemplate(templateId);

    if (response.success) {
      navigate(`/`);
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
          saving: data.saving,
          settings: data.settings,
          information: data.information,
          participants: data.participants,
          errorMessages: data.errorMessages,
          dispatch,
          save,
          delete: deleteBracketTemplate,
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
