import * as React from 'react';

import { useTimeout } from 'hooks/useTimeout';

import './LoadingDisplay.css';

export default function LoadingDisplay() {
  const [showOrbs, setShowOrbs] = React.useState(false);
  const orbs = Array(3).fill(null);

  // We only want to show the loading display if we are actually taking a while.
  useTimeout(() => setShowOrbs((p) => !p), 1500);

  if (!showOrbs) {
    return null;
  }

  return (
    <div className="LoadingDisplay">
      {orbs.map((_, i) => (
        <div key={i} className="LoadingDisplay__Orb" />
      ))}
    </div>
  );
}
