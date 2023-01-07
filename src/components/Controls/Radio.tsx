import * as React from 'react';

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
      <label className="Control__Radio" htmlFor={props.id}>
        <input type="radio" {...inputProps} />
        {label}
      </label>
    </div>
  );
}
