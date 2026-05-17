import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './tab-feature-digit.css';

export type TabFeatureDigitState = 'default' | 'hover' | 'click' | 'active';

const stateClass: Partial<Record<TabFeatureDigitState, string>> = {
  hover: 'tab-feature-digit--state-hover',
  click: 'tab-feature-digit--state-click',
  active: 'tab-feature-digit--state-active',
};

/** Figma progressBar — active (4090:7872) */
const ACTIVE_PROGRESS_PATH =
  'M35.5 18C35.5 14.3435 34.3547 10.7788 32.2248 7.80664C30.095 4.83446 27.0877 2.60407 23.6252 1.42872C20.1627 0.253376 16.4191 0.192116 12.92 1.25354C9.42096 2.31497 6.34226 4.44577 4.11632 7.34668C1.89038 10.2476 0.629011 13.7729 0.509374 17.4274C0.389736 21.082 1.41784 24.6822 3.44929 27.7225C5.48073 30.7628 8.41348 33.0903 11.8356 34.3784C15.2578 35.6664 18.9974 35.8501 22.5293 34.9037';

export interface TabFeatureDigitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  /** Принудительное состояние для Storybook; без prop — default/hover/click через :hover/:active */
  state?: TabFeatureDigitState;
  /** Выбранная вкладка (дуга progressBar); без state */
  active?: boolean;
}

export function TabFeatureDigit({
  children = '00',
  state,
  active = false,
  className,
  type: buttonType = 'button',
  ...props
}: TabFeatureDigitProps) {
  const isActive = state === 'active' || (!state && active);
  const classes = [
    'tab-feature-digit',
    state && state !== 'default' ? stateClass[state] : '',
    isActive && state !== 'active' ? 'tab-feature-digit--active' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={buttonType} className={classes} {...props}>
      <svg className="tab-feature-digit__ring" viewBox="0 0 36 36" aria-hidden>
        <circle cx="18" cy="18" r="17.5" fill="none" />
      </svg>
      <svg className="tab-feature-digit__progress" viewBox="0 0 36 36" aria-hidden>
        <path d={ACTIVE_PROGRESS_PATH} fill="none" />
      </svg>
      <span className="tab-feature-digit__label badge-label-base">{children}</span>
    </button>
  );
}
