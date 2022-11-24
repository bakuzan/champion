import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import BracketCreator from './views/BracketCreator';
import HomePage from './views/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/template/new" element={<BracketCreator />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

function render() {
  const root = createRoot(document.getElementById('root'));
  root.render(<App />);
}

render();
