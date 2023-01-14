import * as React from 'react';
import classNames from 'utils/classNames';

interface RadioProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'type'
  > {
  id: string;
  label: string;
}

export default function Radio(props: RadioProps) {
  const { label, ...inputProps } = props;

  return (
    <div className="Control">
      <label
        className={classNames(
          'Control__Radio',
          inputProps.disabled && 'Control__Radio--Disabled'
        )}
        htmlFor={props.id}
      >
        <input type="radio" {...inputProps} />
        {label}
      </label>
    </div>
  );
}
