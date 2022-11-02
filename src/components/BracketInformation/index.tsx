import * as React from 'react';

import BracketOption from './BracketOption';
import { BracketInformationOptions } from './BracketInformationOptions';
import BracketPanel from 'components/BracketPanel';
import classNames from 'utils/classNames';

import './BracketInformation.css';

const DEFAULT_ACTIVE_OPTION = BracketInformationOptions.Information;

interface BracketInformationProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

function BracketInformation({
  isCollapsed,
  onToggleCollapse
}: BracketInformationProps) {
  const [activeOption, setActiveOption] = React.useState(DEFAULT_ACTIVE_OPTION);

  return (
    <div
      className={classNames(
        'BracketInformation',
        isCollapsed && 'BracketInformation--Collapsed'
      )}
    >
      <div className="BracketInformation_Options">
        <BracketOption
          title="Information"
          activeOption={activeOption}
          optionValue={BracketInformationOptions.Information}
          onClick={setActiveOption}
        >
          I
        </BracketOption>
        <BracketOption
          title="Participants"
          activeOption={activeOption}
          optionValue={BracketInformationOptions.Participants}
          onClick={setActiveOption}
        >
          P
        </BracketOption>

        <button
          type="button"
          className="BracketOption BracketInformation_Toggle"
          title={isCollapsed ? 'Expand information' : 'Collapse information'}
          onClick={onToggleCollapse}
        >
          {isCollapsed ? '>' : '<'}
        </button>
      </div>
      <div className="BracketInformation_View">
        <BracketPanel activeOption={activeOption} />
      </div>
    </div>
  );
}

export default BracketInformation;
