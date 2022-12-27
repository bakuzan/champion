import * as React from 'react';

import { useTimeout } from 'hooks/useTimeout';

import './LoadingDisplay.css';

interface LoadingDisplayProps
  extends Pick<React.HTMLProps<HTMLDivElement>, 'children'> {
  isLoading: boolean;
}

export default function LoadingDisplay({
  isLoading,
  children
}: LoadingDisplayProps) {
  const [showOrbs, setShowOrbs] = React.useState(false);
  const orbs = Array(3).fill(null);

  // We only want to show the loading display if we are actually taking a while.
  useTimeout(() => setShowOrbs((p) => !p), isLoading, 1000);

  if (isLoading && showOrbs) {
    return (
      <div className="LoadingDisplay">
        {orbs.map((_, i) => (
          <div key={i} className="LoadingDisplay__Orb" />
        ))}
      </div>
    );
  } else {
    return <React.Fragment>{children}</React.Fragment>;
  }
}
