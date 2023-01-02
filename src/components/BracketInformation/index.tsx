import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import BracketOption from './BracketOption';
import { BracketInformationOptions } from './BracketInformationOptions';
import BracketPanel from 'components/BracketPanel';
import classNames from 'utils/classNames';

import './BracketInformation.css';

export const DEFAULT_ACTIVE_OPTION = BracketInformationOptions.Information;

interface BracketInformationProps {
  activeValue?: BracketInformationOptions;
  isCollapsed: boolean;
  onSelectOption?: React.Dispatch<
    React.SetStateAction<BracketInformationOptions>
  >;
  onToggleCollapse: () => void;
}

function BracketInformation({
  activeValue,
  isCollapsed,
  onSelectOption,
  onToggleCollapse
}: BracketInformationProps) {
  const [activeOption, setActiveOption] = React.useState(DEFAULT_ACTIVE_OPTION);
  const navigate = useNavigate();

  const currentActiveOptionValue = activeValue ?? activeOption;
  function handleActiveOption(optionValue: BracketInformationOptions) {
    if (activeValue && onSelectOption) {
      onSelectOption(optionValue);
    } else {
      setActiveOption(optionValue);
    }
  }

  return (
    <div
      className={classNames(
        'BracketInformation',
        isCollapsed && 'BracketInformation--Collapsed'
      )}
    >
      <div className="BracketInformation_Options">
        <BracketOption
          title="Home"
          activeOption={currentActiveOptionValue}
          optionValue={BracketInformationOptions.Home}
          onClick={() => navigate('/')}
        >
          H
        </BracketOption>
        <BracketOption
          title="Information"
          activeOption={currentActiveOptionValue}
          optionValue={BracketInformationOptions.Information}
          onClick={handleActiveOption}
        >
          I
        </BracketOption>
        <BracketOption
          title="Participants"
          activeOption={currentActiveOptionValue}
          optionValue={BracketInformationOptions.Participants}
          onClick={handleActiveOption}
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
        <BracketPanel activeOption={currentActiveOptionValue} />
      </div>
    </div>
  );
}

export default BracketInformation;
