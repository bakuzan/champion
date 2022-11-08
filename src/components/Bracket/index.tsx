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
  console.log('<Bracket> :: ', bracketRounds);

  return (
    <div className="Bracket">
      {bracketRounds.map((br) => (
        <div
          key={br.name}
          className={classNames('Round', `Round--${br.matchups.length}`)}
        >
          <div className="Round_Name">{br.name}</div>
          {br.matchups.map((mu) => {
            const pOne = mu.participantOne;
            const pTwo = mu.participantTwo;
            const matchKey = `${pOne.key}_${pTwo.key}`;

            return (
              <div key={matchKey} className="Matchup">
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
      ))}
    </div>
  );
}

export default Bracket;
