import type { ButtonHTMLAttributes } from 'react';
import { CheckboxCheckmark } from './CheckboxCheckmark';
import type { CheckboxItemState } from './types';
import './checkbox-toggle.css';

export interface CheckboxToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  active?: boolean;
  disabled?: boolean;
  /** For Storybook static rows; omit for live :hover/:active */
  state?: CheckboxItemState;
  className?: string;
}

function isCheckVisible(active: boolean, disabled: boolean, state?: CheckboxItemState): boolean {
  if (active) return true;
  if (disabled) return false;
  return state === 'hover' || state === 'click';
}

export function CheckboxToggle({
  active = false,
  disabled = false,
  state,
  className,
  ...props
}: CheckboxToggleProps) {
  const checkVisible = isCheckVisible(active, disabled, state);
  /** Slot for off + interactive hover/click (CSS); hidden when off disabled */
  const renderCheckSlot = active || !disabled;

  const rootClasses = [
    'checkbox-toggle',
    active ? 'checkbox-toggle--active' : 'checkbox-toggle--off',
    disabled ? 'checkbox-toggle--disabled' : '',
    state && state !== 'normal' ? `checkbox-toggle--state-${state}` : '',
    checkVisible ? 'checkbox-toggle--check-visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={active}
      disabled={disabled}
      className={rootClasses}
      {...props}
    >
      {renderCheckSlot ? (
        <span className="checkbox-toggle__check-wrap" data-name="toggle" aria-hidden>
          <CheckboxCheckmark
            className="checkbox-toggle__check"
            muted={disabled && active}
          />
        </span>
      ) : null}
    </button>
  );
}
