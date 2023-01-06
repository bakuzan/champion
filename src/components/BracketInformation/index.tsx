import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import BracketOption from './BracketOption';
import { BracketInformationOptions } from './BracketInformationOptions';
import BracketPanel from 'components/BracketPanel';
import classNames from 'utils/classNames';

import './BracketInformation.css';

interface BracketInformationProps {
  activeValue: BracketInformationOptions;
  isCollapsed: boolean;
  isCompleteTournament?: boolean;
  onSelectOption: React.Dispatch<
    React.SetStateAction<BracketInformationOptions>
  >;
  onToggleCollapse: () => void;
}

function BracketInformation({
  activeValue,
  isCollapsed,
  isCompleteTournament,
  onSelectOption,
  onToggleCollapse
}: BracketInformationProps) {
  const navigate = useNavigate();
  const isResultsOption = activeValue === BracketInformationOptions.Results;

  function handleActiveOption(optionValue: BracketInformationOptions) {
    onSelectOption(optionValue);
  }

  return (
    <div
      className={classNames(
        'BracketInformation',
        isCollapsed && 'BracketInformation--Collapsed',
        isResultsOption && 'BracketInformation--NoView'
      )}
    >
      <div className="BracketInformation_Options">
        <BracketOption
          title="Home"
          activeOption={activeValue}
          optionValue={BracketInformationOptions.Home}
          onClick={() => navigate('/')}
        >
          H
        </BracketOption>
        <BracketOption
          title="Information"
          activeOption={activeValue}
          optionValue={BracketInformationOptions.Information}
          onClick={handleActiveOption}
        >
          I
        </BracketOption>
        <BracketOption
          title="Participants"
          activeOption={activeValue}
          optionValue={BracketInformationOptions.Participants}
          onClick={handleActiveOption}
        >
          P
        </BracketOption>
        {isCompleteTournament && (
          <BracketOption
            title="Results"
            activeOption={activeValue}
            optionValue={BracketInformationOptions.Results}
            onClick={handleActiveOption}
          >
            R
          </BracketOption>
        )}

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
        <BracketPanel activeOption={activeValue} />
      </div>
    </div>
  );
}

export default BracketInformation;
