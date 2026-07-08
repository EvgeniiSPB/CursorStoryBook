/**
 * Shape of a control surfaced by the RightSidePanel.
 * Maps to a single Storybook `argType` after `mapArgTypeToControl()` normalization.
 */

export interface ToggleControl {
  kind: 'toggle';
  name: string;
  /** Optional design-friendly label — overrides `name` for the visible caption
   *  (e.g. Figma prop name like "value" instead of the React `children` key). */
  label?: string;
  value: boolean;
}

export interface SelectControl {
  kind: 'select';
  name: string;
  label?: string;
  value: string | number | undefined;
  options: ReadonlyArray<string | number>;
}

export interface InputControl {
  kind: 'input';
  name: string;
  label?: string;
  value: string;
  /** `text` | `number` — affects the input's input-mode and parse on commit. */
  inputType?: 'text' | 'number';
}

export type Control = ToggleControl | SelectControl | InputControl;
