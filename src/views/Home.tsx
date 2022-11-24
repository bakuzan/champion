import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="App">
      <button type="button" onClick={() => navigate('/template/new')}>
        Create new bracket
      </button>
      <div>
        Page under construction...
        <br />
        Will display templates and tournaments eventually!
      </div>
    </main>
  );
}
