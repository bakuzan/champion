import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { BracketInformation } from 'types/BracketInformation';

export default function HomePage() {
  const [tournaments, setTournaments] = React.useState([]);
  const [bracketTemplates, setBracketTemplates] = React.useState<
    BracketInformation[]
  >([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    setBracketTemplates(window.Champion.getBracketTemplates());
    setTournaments([]); // TODO fetch tournaments when implemented
  }, []);

  return (
    <main className="App">
      <div className="App__Actions">
        <button
          type="button"
          className="PrimaryButton"
          onClick={() => navigate('/template-new')}
        >
          Create new bracket
        </button>
      </div>
      <div className="App__Landing">
        <section className="BracketList">
          <h2 className="BracketList__Title">Bracket Templates</h2>
          <ul className="BracketList__Items">
            {bracketTemplates.map((x) => (
              <li key={x.id} className="BracketListItem">
                <NavLink to={`/template/${x.id}`}>{x.name}</NavLink>
              </li>
            ))}
          </ul>
        </section>
        <section className="BracketList">
          <h2 className="BracketList__Title">Tournaments</h2>
          <ul className="BracketList__Items"></ul>
        </section>
      </div>
    </main>
  );
}
