import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import BracketCreator from './views/BracketCreator';
import HomePage from './views/Home';
import NotFoundPage from 'views/404';
import Tournament from 'views/Tournament';
import AppSettings from 'views/AppSettings';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          key="Bracket_Create"
          path="/template-new"
          element={<BracketCreator />}
        />
        <Route
          key="Bracket_Update"
          path="/template/:templateId"
          element={<BracketCreator />}
        />

        <Route path="/tournament/:tournamentId" element={<Tournament />} />
        <Route path="/settings" element={<AppSettings />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

function render() {
  window.Champion.ping(); // TODO : Remove, Just a check for working with main/renderer

  const root = createRoot(document.getElementById('root'));
  root.render(<App />);
}

render();
