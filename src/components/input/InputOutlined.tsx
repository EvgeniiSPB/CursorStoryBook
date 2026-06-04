import type { CSSProperties, InputHTMLAttributes } from 'react';
import { TextCore } from '../atoms/text-core/TextCore';
import {
  inputOutlinedDisplayValue,
  type InputOutlinedState,
  type InputOutlinedVariant,
} from './types';
import './input-outlined.css';

export interface InputOutlinedProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder' | 'disabled'> {
  label?: string;
  value?: string;
  /** Figma `placeholder` — empty single-line label (not floated) */
  placeholder?: boolean;
  active?: boolean;
  filled?: boolean;
  disabled?: boolean;
  /** Storybook static rows; omit for live :hover/:focus */
  state?: InputOutlinedState;
  className?: string;
}

function resolveFloated({ placeholder = true }: Pick<InputOutlinedProps, 'placeholder'>): boolean {
  return !placeholder;
}

export function InputOutlined({
  label = 'Label',
  value = 'Value',
  placeholder = true,
  active = false,
  filled = false,
  disabled = false,
  state,
  className,
  id,
  ...inputProps
}: InputOutlinedProps) {
  const floated = resolveFloated({ placeholder });
  const staticPreview = state !== undefined;
  const displayValue = inputOutlinedDisplayValue({ active, filled, disabled }, value);
  const showValue =
    floated &&
    (staticPreview ? displayValue.length > 0 || filled || (disabled && !placeholder) : true);

  const rootClasses = [
    'input-outlined',
    floated ? 'input-outlined--floated' : '',
    disabled ? 'input-outlined--disabled' : '',
    state && state !== 'normal' ? `input-outlined--state-${state}` : '',
    staticPreview ? 'input-outlined--static' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const labelTypography = floated ? 'bodyXS' : 'bodyM';

  return (
    <div
      className={rootClasses}
      style={{ '--input-outlined-min-height': 56 } as CSSProperties}
      data-name="input - outlined"
    >
      <TextCore
        typography={labelTypography}
        fontWeight="regular"
        text={label}
        className="input-outlined__label"
      />
      {floated ? (
        <div className="input-outlined__field">
          {staticPreview ? (
            showValue ? (
              <TextCore
                typography="bodyM"
                fontWeight="regular"
                text={displayValue}
                className="input-outlined__value"
              />
            ) : null
          ) : (
            <input
              id={id}
              type="text"
              className="input-outlined__input text-core text-style--body-m-regular text-core--body"
              disabled={disabled}
              defaultValue={filled ? value : undefined}
              aria-label={label}
              {...inputProps}
            />
          )}
        </div>
      ) : null}
    </div>
  );
}

export function inputOutlinedPropsFromVariant(
  variant: InputOutlinedVariant,
): InputOutlinedProps {
  return {
    placeholder: variant.placeholder,
    active: variant.active,
    filled: variant.filled,
    disabled: variant.disabled,
    state: variant.state,
  };
}
