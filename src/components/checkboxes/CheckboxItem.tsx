import type { LabelHTMLAttributes, ReactNode } from 'react';
import { TextCore } from '../atoms/text-core/TextCore';
import { CheckboxToggle } from './CheckboxToggle';
import type { CheckboxItemState } from './types';
import './checkbox-item.css';

export interface CheckboxItemProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  children?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  state?: CheckboxItemState;
  className?: string;
}

export function CheckboxItem({
  children = 'Value',
  active = false,
  disabled = false,
  state,
  className,
  ...props
}: CheckboxItemProps) {
  const rootClasses = [
    'checkbox-item',
    disabled ? 'checkbox-item--disabled' : '',
    state && state !== 'normal' ? `checkbox-item--state-${state}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={rootClasses} {...props}>
      <CheckboxToggle active={active} disabled={disabled} state={state} />
      {typeof children === 'string' ? (
        <TextCore typography="bodyM" fontWeight="regular" text={children} className="checkbox-item__label" />
      ) : (
        <span className="checkbox-item__label-slot">{children}</span>
      )}
    </label>
  );
}
