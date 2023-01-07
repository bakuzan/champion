import * as React from 'react';
import classNames from 'utils/classNames';

interface TextInputProps
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

export default function TextInput(props: TextInputProps) {
  const { className, label, ...inputProps } = props;

  return (
    <div className={classNames('Control', className)}>
      <label htmlFor={props.id}>{label}</label>
      <input type="text" {...inputProps} />
    </div>
  );
}
