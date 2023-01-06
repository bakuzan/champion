import React from 'react';

import { BracketInformationOptions } from 'components/BracketInformation/BracketInformationOptions';
import InformationPanel from './InformationPanel';
import ParticipantsPanel from './ParticipantsPanel';

import './BracketPanel.css';

interface BracketPanelProps {
  activeOption: BracketInformationOptions;
}

export default function BracketPanel({ activeOption }: BracketPanelProps) {
  switch (activeOption) {
    case BracketInformationOptions.Information:
      return <InformationPanel />;
    case BracketInformationOptions.Participants:
      return <ParticipantsPanel />;
    default:
      return null;
  }
}
