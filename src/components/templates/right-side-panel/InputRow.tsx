// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
void React;
import { useId, type HTMLAttributes } from 'react';
import './input-row.css';

export interface InputRowProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label: string;
  value: string;
  onChange: (next: string) => void;
  inputType?: 'text' | 'number';
  /** Removes the top divider — used for the first row in a panel body. */
  firstChild?: boolean;
  disabled?: boolean;
}

/** Text/number input with a static uppercase label above (Figma node 6553:41102).
 *  The 5 Figma states (default / active / filled / hover variants) emerge
 *  automatically from `:focus-within`, `:hover`, and presence of `value`. */
export function InputRow({
  label,
  value,
  onChange,
  inputType = 'text',
  firstChild = false,
  disabled = false,
  className,
  ...rest
}: InputRowProps) {
  const inputId = useId();
  const filled = value.length > 0;

  const classes = [
    'rsp-input-row',
    firstChild ? 'rsp-input-row--first-child' : '',
    filled ? 'rsp-input-row--filled' : '',
    disabled ? 'rsp-input-row--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} data-name="input-row" {...rest}>
      <div className="rsp-input-row__inner">
        <label className="rsp-input-row__label" htmlFor={inputId}>
          {label}
        </label>
        <div className="rsp-input-row__field">
          <input
            id={inputId}
            className="rsp-input-row__input"
            type={inputType}
            inputMode={inputType === 'number' ? 'numeric' : 'text'}
            value={value}
            placeholder={label}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
