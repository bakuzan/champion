import * as React from 'react';

import { Tournament, TournamentRound } from 'types/Tournament';
import { Radio } from 'components/Controls';

import { typeOptions, seedOptions } from './createNewOptions';
import { getTournamentResults } from './utils';

import './ResultsDisplay.css';

interface ResultsDisplayProps {
  information: Tournament;
  rounds: TournamentRound[];
}

export default function ResultsDisplay(props: ResultsDisplayProps) {
  const { information, rounds } = props;
  const tournamentName = information.name;
  const tournamentDescription = information.description;
  const rankedParticipants = getTournamentResults(rounds);
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
                  checked={false}
                  onChange={(event) => null} // TODO connect this up
                />
              ))}
            </div>
            <div className="RadioGroup">
              {seedOptions.map((option) => (
                <Radio
                  key={option.id}
                  {...option}
                  checked={false}
                  onChange={(event) => null} // TODO connect this up
                />
              ))}
            </div>
            <div className="ButtonGroup ButtonGroup--Right">
              <button
                type="button"
                className="PrimaryButton"
                disabled={false} // TODO source this real value
                onClick={() => null} // TODO call real function
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
