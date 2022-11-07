import React from 'react';

import { AppContext } from 'context/index';
import { buildRounds } from './Builder';

import './Bracket.css';

function Bracket() {
  const context = React.useContext(AppContext);
  const { participants } = context;
  // Need to fetch the "rounds" that participants slot into

  const initialRounds = buildRounds(participants);
  console.log('<Bracket> :: ', initialRounds);

  return <div className="Bracket"></div>;
}

export default Bracket;
