import * as React from 'react';

import { BracketInformationOptions } from './BracketInformationOptions';
import classNames from 'utils/classNames';

interface BracketOptionProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'onClick'
  > {
  activeOption: BracketInformationOptions;
  optionValue: BracketInformationOptions;
  onClick: (option: BracketInformationOptions) => void;
}

function BracketOption({
  children,
  className,
  activeOption,
  optionValue,
  onClick,
  ...props
}: BracketOptionProps) {
  const isSelected = activeOption === optionValue;
  const classes = classNames(
    'BracketOption',
    isSelected && 'BracketOption--Active'
  );

  return (
    <button
      type="button"
      className={classes}
      onClick={() => onClick(optionValue)}
      {...props}
    >
      {children}
    </button>
  );
}

export default BracketOption;
