import React from 'react';

import { AppContext } from 'context/index';

import './Bracket.css';

function Bracket() {
  const context = React.useContext(AppContext);
  console.log('<Bracket> :: ');

  return <div className="Bracket">i will render the bracket here</div>;
}

export default Bracket;
