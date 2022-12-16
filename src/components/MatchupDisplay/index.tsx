import * as React from 'react';

import { TournamentRoundMatchup } from 'types/Tournament';

import ParticipantCard from 'components/ParticipantCard';

import './MatchupDisplay.css';

interface MatchupDisplayProps {
  match: TournamentRoundMatchup;
}

export default function MatchupDisplay(props: MatchupDisplayProps) {
  const { match } = props;
  const [scoreOne, setScoreOne] = React.useState(match.participantOneScore);
  const [scoreTwo, setScoreTwo] = React.useState(match.participantTwoScore);

  const pOne = match.participantOne;
  const pTwo = match.participantTwo;
  const matchTitle = ``;
  const matchDescription = ``;

  function onCloseDisplay() {
    console.log('CLOSE DISPLAY not implement yet!');
  }

  function onPostResults() {
    console.log('POST RESULTS not implement yet!');
  }

  console.log('<MatchupDisplay> ', props);
  return (
    <section className="MatchupDisplay">
      <div className="MatchupDisplay__Close">
        <button
          type="button"
          title="Close Matchup Display"
          className="MatchDisplay__Cancel"
          onClick={onCloseDisplay}
        >
          <span aria-hidden={true}>&#10060;&#xFE0E;</span>
        </button>
      </div>
      <header className="MatchupDisplay__Header">
        <h2>{matchTitle}</h2>
        <p>{matchDescription}</p>
      </header>
      <div className="MatchupDisplay__Content">
        <ParticipantCard
          participant={pOne}
          score={scoreOne}
          onScoreChange={(v) => setScoreOne(v)}
        />
        <ParticipantCard
          participant={pTwo}
          score={scoreTwo}
          onScoreChange={(v) => setScoreTwo(v)}
        />
        <div className="ButtonGroup">
          <button
            type="button"
            className="RegularButton"
            onClick={onCloseDisplay}
          >
            Cancel
          </button>
          <button
            type="button"
            className="PrimaryButton"
            onClick={onPostResults}
          >
            Post Results
          </button>
        </div>
      </div>
    </section>
  );
}
