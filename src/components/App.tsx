import * as React from 'react';

import BracketInformation from './BracketInformation';
import Bracket from './Bracket';
import classNames from 'utils/classNames';

import './App.css';

function App() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <main className={classNames('App', isCollapsed && 'App--BracketFill')}>
      <BracketInformation
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((p) => !p)}
      />
      <Bracket />
    </main>
  );
}

export default App;
