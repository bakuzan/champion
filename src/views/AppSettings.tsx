import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AppSettingsAction } from 'types/AppAction';
import { AppSettingsMap, AppSettingValue } from 'types/AppSetting';

import LoadingDisplay from 'components/LoadingDisplay';

import './AppSettings.css';

interface AppSettingsState {
  loading: boolean;
  settings: AppSettingsMap;
  errorMessages: Map<string, string>;
}

function reducer(state: AppSettingsState, action: AppSettingsAction) {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        ...state,
        loading: false,
        settings: action.data,
        errorMessages: new Map<string, string>([])
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: state.settings.set(action.data.key, action.data.value)
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

const DEFAULT_STATE: AppSettingsState = {
  loading: true,
  settings: new Map<string, AppSettingValue>([]),
  errorMessages: new Map<string, string>([])
};

export default function AppSettings() {
  const [data, dispatch] = React.useReducer(reducer, DEFAULT_STATE);

  const navigate = useNavigate();
  const { key: locationKey } = useLocation(); // will be different for each navigate!
  const { settings } = data;

  React.useEffect(() => {
    dispatch({
      type: 'LOAD_DATA',
      data: window.Champion.getSettings()
    });
  }, [locationKey]);

  function saveSettings() {
    const response = window.Champion.saveSettings(settings);

    if (response.success) {
      navigate(`/settings`);
    } else {
      dispatch({ type: 'SET_ERROR', data: response.errorMessages });
    }
  }
  console.log('<AppSettings> :: ', data);
  return (
    <LoadingDisplay isLoading={data.loading}>
      <main className="AppSettings">
        <header className="AppSettings__Header">
          <h1 className="AppSettings__Title">App Settings</h1>
          <div className="ButtonGroup">
            <button
              type="button"
              className="RegularButton"
              onClick={() => navigate('/')}
            >
              Back
            </button>
          </div>
        </header>
        <div className="AppSettings__Options">
          <div className="Control">
            <label className="Control__Checkbox" htmlFor="showSeedOrder">
              <input
                type="checkbox"
                id="showSeedOrder"
                name="showSeedOrder"
                checked={(settings.get('showSeedOrder') as boolean) ?? false}
                onChange={(event) =>
                  dispatch({
                    type: 'UPDATE_SETTINGS',
                    data: {
                      key: 'showSeedOrder',
                      value: event.currentTarget.checked
                    }
                  })
                }
              />
              Show Seed Order
            </label>
          </div>
          <div className="Control">
            <label htmlFor="winnerCrownColour">Winner Crown Colour</label>
            <select
              id="winnerCrownColour"
              name="winnerCrownColour"
              value={(settings.get('winnerCrownColour') as string) ?? ''}
              onChange={(event) =>
                dispatch({
                  type: 'UPDATE_SETTINGS',
                  data: {
                    key: 'winnerCrownColour',
                    value: event.currentTarget.value
                  }
                })
              }
            >
              <option value="tyrian_purple">Tyrian Purple</option>
              <option value="gold">Gold</option>
            </select>
          </div>
        </div>
        <div className="ButtonGroup">
          <button
            type="button"
            className="PrimaryButton"
            onClick={saveSettings}
          >
            Save Settings
          </button>
        </div>
      </main>
    </LoadingDisplay>
  );
}
