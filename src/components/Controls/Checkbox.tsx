import * as React from 'react';
import classNames from 'utils/classNames';

interface CheckboxProps
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

export default function Checkbox(props: CheckboxProps) {
  const { label, ...inputProps } = props;

  return (
    <div className="Control">
      <label
        className={classNames(
          'Control__Checkbox',
          inputProps.disabled && 'Control__Checkbox--Disabled'
        )}
        htmlFor={props.id}
      >
        <input type="checkbox" {...inputProps} />
        {label}
      </label>
    </div>
  );
}
