import React from 'react';

import { AppContext } from 'context/index';
import { buildRounds } from './Builder';
import classNames from 'utils/classNames';

import './Bracket.css';

function Bracket() {
  const context = React.useContext(AppContext);
  const { participants } = context;
  // Need to fetch the "rounds" that participants slot into

  const bracketRounds = buildRounds(participants);
  const bracketSize = Math.pow(2, bracketRounds.length);
  console.log('<Bracket> :: ', bracketRounds);

  return (
    <div className={classNames('Bracket', `Bracket--${bracketSize}`)}>
      {bracketRounds.map((br) => {
        const isQualifiers = br.name === 'Qualifiers';
        const roundParticipantCount = isQualifiers
          ? bracketSize
          : br.matchups.length * 2;

        return (
          <div
            key={br.name}
            className={classNames('Round', `Round--${roundParticipantCount}`)}
          >
            <div className="Round_Name">{br.name}</div>
            {br.matchups.map((mu) => {
              const pOne = mu.participantOne;
              const pTwo = mu.participantTwo;
              const matchKey = `${pOne.key}_${pTwo.key}`;
              const hasNoParticipants =
                pOne.text === 'TBC' && pTwo.text === 'TBC';

              return (
                <div
                  key={matchKey}
                  className={classNames(
                    'Matchup',
                    isQualifiers && hasNoParticipants && 'Matchup--Hidden'
                  )}
                >
                  <div className="Matchup_Slot Matchup_Slot--Top">
                    {pOne.text}
                  </div>
                  <div className="Matchup_Slot Matchup_Slot--Bot">
                    {pTwo.text}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Bracket;
