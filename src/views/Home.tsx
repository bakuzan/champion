import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { BracketLink } from 'types/BracketInformation';

import BracketListSection from 'components/BracketListSection';

import './Home.css';

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
