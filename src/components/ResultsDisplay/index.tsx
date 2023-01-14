import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Tournament, TournamentRound } from 'types/Tournament';

import { Radio } from 'components/Controls';
import ErrorMessages from 'components/ErrorMessages';

import reducer, { ResultsDisplayState } from 'reducers/resultsDisplay';

import {
  typeOptions,
  seedOptions,
  CreateTypeOption,
  CreateSeedOrderOption
} from './createNewOptions';

import { getTournamentResults } from './utils';
import { mapDataToPayload as mapToBracketTemplate } from 'utils/mappers/bracketTemplate';
import { isSaveBracketTemplateResponse } from 'utils/guards';

import './ResultsDisplay.css';

interface ResultsDisplayProps {
  information: Tournament;
  rounds: TournamentRound[];
}

const DEFAULT_STATE: ResultsDisplayState = {
  saving: false,
  createType: null,
  createSeedOrder: null,
  errorMessages: new Map<string, string>([])
};

export default function ResultsDisplay(props: ResultsDisplayProps) {
  const [data, dispatch] = React.useReducer(reducer, DEFAULT_STATE);
  const navigate = useNavigate();

  const { information, rounds } = props;
  const tournamentName = information.name;
  const tournamentDescription = information.description;
  const rankedParticipants = getTournamentResults(rounds);

  const preventCreate =
    data.createType === null || data.createSeedOrder === null;

  async function handleCreateNew() {
    dispatch({ type: 'SAVING' });

    const isBracketCreate =
      data.createType === CreateTypeOption.BracketTemplate;
    const isResultsOrder =
      data.createSeedOrder === CreateSeedOrderOption.Results;

    const participants = isResultsOrder
      ? rankedParticipants.map((x, i) => ({ ...x, seedOrder: i }))
      : rankedParticipants.sort((a, b) => a.seedOrder - b.seedOrder);

    const response = isBracketCreate
      ? await window.Champion.saveBracketTemplate(
          mapToBracketTemplate(information, participants, true)
        )
      : window.Champion.createTournamentFromResults(information, participants);

    if (response.success) {
      navigate(
        isSaveBracketTemplateResponse(response)
          ? `/template/${response.bracketTemplateId}`
          : `/tournament/${response.tournamentId}`
      );
    } else {
      dispatch({ type: 'SET_ERROR', data: response.errorMessages });
    }
  }

  console.log('<ResultsDisplay> :: ', rankedParticipants, information, rounds);
  return (
    <section className="ResultsDisplay">
      <header className="ResultsDisplay__Header">
        <h2>{tournamentName} Results</h2>
      </header>
      <div className="ResultsDisplay__Content">
        <div className="ResultsDisplayMeta">
          <p className="ResultsDisplayMeta__Description">
            {tournamentDescription}
          </p>
          <p className="ResultsDisplayMeta__RoundInfo">
            {rankedParticipants.length} Participants
          </p>
        </div>
        <div className="ResultsDisplayGrid">
          <table className="Table">
            <thead>
              <tr className="Table__Row Table__Header">
                <td className="Cell Cell--RightAlign">
                  <div>Rank</div>
                </td>
                <td className="Cell">
                  <div>Participant</div>
                </td>
                <td
                  className="Cell Cell--RightAlign"
                  title="Seed versus result difference."
                >
                  <div aria-hidden="true">Diff</div>
                </td>
              </tr>
            </thead>
            <tbody>
              {rankedParticipants.map((part, index) => {
                const diff = part.seedOrder - index;
                const seedResultDiff =
                  diff > 0 ? `+${diff}` : diff === 0 ? '-' : diff;

                return (
                  <tr key={part.id} className="Table__Row">
                    <td className="Cell Cell--RightAlign">
                      <div>{index + 1}</div>
                    </td>
                    <td className="Cell">
                      <div className="ParticipantInfo">
                        {part.image && (
                          <div className="ParticipantInfo__ImageContainer">
                            <img
                              className="ParticipantInfo__Image"
                              src={part.image}
                              alt={part.text}
                              onError={null}
                            />
                          </div>
                        )}
                        <div className="ParticipantInfo__Name">{part.text}</div>
                      </div>
                    </td>
                    <td className="Cell Cell--RightAlign">
                      <div
                        style={{
                          color:
                            diff > 0
                              ? `forestgreen`
                              : diff === 0
                              ? `slategrey`
                              : `firebrick`
                        }}
                      >
                        {seedResultDiff}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="ResultsDisplay__Actions">
            <p className="ResultsDisplayQuestion">
              Create a new tournament or bracket template from this completed
              tournament?
            </p>
            <div className="RadioGroup">
              {typeOptions.map((option) => (
                <Radio
                  key={option.id}
                  {...option}
                  checked={option.value === data.createType}
                  onChange={(event) => {
                    const createType = Number(event.currentTarget.value);

                    dispatch({
                      type: 'UPDATE_OPTION',
                      data: { createType }
                    });
                  }}
                />
              ))}
            </div>
            <div className="RadioGroup">
              {seedOptions.map((option) => (
                <Radio
                  key={option.id}
                  {...option}
                  checked={option.value === data.createSeedOrder}
                  onChange={(event) => {
                    const createSeedOrder = Number(event.currentTarget.value);

                    dispatch({
                      type: 'UPDATE_OPTION',
                      data: { createSeedOrder }
                    });
                  }}
                />
              ))}
            </div>
            <div className="ButtonGroup ButtonGroup--Right">
              <button
                type="button"
                className="PrimaryButton"
                disabled={preventCreate}
                onClick={handleCreateNew}
              >
                Create
              </button>
            </div>

            <ErrorMessages style={{ flex: 1 }} messages={data.errorMessages} />
          </div>
        </div>
      </div>
    </section>
  );
}
