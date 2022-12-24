import * as React from 'react';

import { TournamentRoundMatchup } from 'types/Tournament';

import { AppContext } from 'context/index';

import ParticipantCard from 'components/ParticipantCard';

import getOrdinalSuffix from 'utils/getOrdinalSuffix';
import { getShowSeedOrder } from 'utils/settings';

import './MatchupDisplay.css';

interface MatchupDisplayProps {
  match: TournamentRoundMatchup;
  onCloseDisplay: () => void;
  onPostResults: (match: TournamentRoundMatchup) => void;
}

export default function MatchupDisplay(props: MatchupDisplayProps) {
  const { settings } = React.useContext(AppContext);
  const { match } = props;

  const [scoreOne, setScoreOne] = React.useState(match.participantOneScore);
  const [scoreTwo, setScoreTwo] = React.useState(match.participantTwoScore);

  const isComplete =
    match.participantOneScore !== 0 || match.participantTwoScore !== 0;
  const canPostResults = !isComplete && scoreOne !== scoreTwo;

  const pOne = match.participantOne;
  const pOneSeed = getOrdinalSuffix(pOne.seedOrder + 1);
  const pTwo = match.participantTwo;
  const pTwoSeed = getOrdinalSuffix(pTwo.seedOrder + 1);

  const matchTitle = `${pOne.text} vs ${pTwo.text}`;
  const matchDescription = `${pOneSeed} seed faces the ${pTwoSeed} seed`;
  const showSeedOrder = getShowSeedOrder(settings);

  console.log('<MatchupDisplay> ', props);
  return (
    <section className="MatchupDisplay">
      <div className="MatchupDisplay__Close">
        <button
          type="button"
          title="Close Matchup Display"
          className="MatchDisplay__Cancel"
          onClick={props.onCloseDisplay}
        >
          <span aria-hidden={true}>&#10060;&#xFE0E;</span>
        </button>
      </div>
      <header className="MatchupDisplay__Header">
        <h2>{matchTitle}</h2>
        {showSeedOrder && <p>{matchDescription}</p>}
      </header>
      <div className="MatchupDisplay__Content">
        <ParticipantCard
          participant={pOne}
          readOnly={isComplete}
          score={scoreOne}
          onScoreChange={(v) => setScoreOne(v)}
        />
        <ParticipantCard
          participant={pTwo}
          readOnly={isComplete}
          score={scoreTwo}
          onScoreChange={(v) => setScoreTwo(v)}
        />
        <div className="ButtonGroup MatchDisplayButtonGroup">
          <button
            type="button"
            className="RegularButton"
            onClick={props.onCloseDisplay}
          >
            Cancel
          </button>
          {!isComplete && (
            <button
              type="button"
              className="PrimaryButton"
              disabled={!canPostResults}
              onClick={() =>
                props.onPostResults({
                  ...match,
                  participantOneScore: scoreOne,
                  participantTwoScore: scoreTwo
                })
              }
            >
              Post Results
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
