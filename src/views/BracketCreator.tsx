import * as React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { AppSettingKey, AppSettingValue } from 'types/AppSetting';
import { BracketParticipant } from 'types/BracketParticipant';

import { BracketInformationOptions } from 'components/BracketInformation/BracketInformationOptions';
import BracketInformationComponent, {
  DEFAULT_ACTIVE_OPTION
} from 'components/BracketInformation';
import BracketDisplay from 'components/BracketDisplay';
import LoadingDisplay from 'components/LoadingDisplay';

import { AppContext } from 'context/index';
import { buildRounds } from 'builder/index';

import reducer, { AppState } from 'reducers/bracketCreator';

import classNames from 'utils/classNames';
import scrollToAndFocusParticipantControl from 'utils/scrollToAndFocusParticipantControl';

import './BracketCreator.css';

const DEFAULT_STATE: AppState = {
  dirty: false,
  loading: true,
  saving: false,
  settings: new Map<AppSettingKey, AppSettingValue>([]),
  errorMessages: new Map<string, string>([]),
  information: { name: '', description: '' },
  participants: []
};

function BracketCreator() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [activeOption, setActiveOption] = React.useState(DEFAULT_ACTIVE_OPTION);
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

  function handleClickBracketSlot(participant: BracketParticipant) {
    const num = participant.seedOrder;
    if (activeOption !== BracketInformationOptions.Participants) {
      setActiveOption(BracketInformationOptions.Participants);
    }

    scrollToAndFocusParticipantControl(num);
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
            activeValue={activeOption}
            isCollapsed={isCollapsed}
            onSelectOption={setActiveOption}
            onToggleCollapse={() => setIsCollapsed((p) => !p)}
          />
          <BracketDisplay
            rounds={bracketRounds}
            onSlotClick={handleClickBracketSlot}
          />
        </main>
      </AppContext.Provider>
    </LoadingDisplay>
  );
}

export default BracketCreator;
