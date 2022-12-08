import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { BracketLink } from 'types/BracketInformation';

import './Home.css';

interface BracketListSectionProps {
  title: string;
  list: BracketLink[];
  onClick: (itemId: number) => void;
}

function BracketListSection(props: BracketListSectionProps) {
  const items = props.list;
  const hasItems = items.length > 0;

  return (
    <section className="BracketListSection">
      <header className="BracketListSection__Header">
        <h2 className="BracketListSection__Title">{props.title}</h2>
      </header>
      <ul className="BracketListSection__Items">
        {hasItems ? (
          items.map((x) => (
            <li key={x.id} className="BracketLinkItem">
              <button
                type="button"
                className="BracketLink"
                onClick={() => props.onClick(x.id)}
              >
                <div className="BracketLink__Text">{x.name}</div>
                <div className="BracketDescription">{x.description}</div>
              </button>
            </li>
          ))
        ) : (
          <li key="NO_ITEMS" className="BracketLinkItem">
            No items to display.
          </li>
        )}
      </ul>
    </section>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = React.useState([]);
  const [bracketTemplates, setBracketTemplates] = React.useState<BracketLink[]>(
    []
  );

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
        <BracketListSection
          title="Bracket Templates"
          list={bracketTemplates}
          onClick={(itemId) => navigate(`/template/${itemId}`)}
        />
        <BracketListSection
          title="Tournaments"
          list={tournaments}
          onClick={(itemId) => navigate(`/tournament/${itemId}`)}
        />
      </div>
    </main>
  );
}
