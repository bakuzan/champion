import * as React from 'react';

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
      <label className="Control__Checkbox" htmlFor={props.id}>
        <input type="checkbox" {...inputProps} />
        {label}
      </label>
    </div>
  );
}
