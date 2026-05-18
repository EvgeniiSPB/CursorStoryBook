import type { HTMLAttributes } from 'react';
import { resolveIconComponent } from './icons';
import {
  ICON_COLOR_VARS,
  ICON_TONE_VARS,
  type IconColor,
  type IconName,
  type IconSize,
  type IconTone,
} from './types';
import './icon.css';

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  name: IconName;
  size?: IconSize;
  /** Global icon.* token */
  color?: IconColor;
  /** Component-scoped token (overrides color) */
  tone?: IconTone;
  /** Figma icon20 inset layout (TagGroup) */
  inset?: boolean;
  label?: string;
}

export function Icon({
  name,
  size = 20,
  color = 'primary',
  tone,
  inset = false,
  label,
  className,
  style,
  ...props
}: IconProps) {
  const Svg = resolveIconComponent(name, size);

  if (!Svg) {
    if (import.meta.env.DEV) {
      console.warn(`[Icon] "${name}" is not available at size ${size}`);
    }
    return null;
  }

  const colorStyle = tone
    ? { color: ICON_TONE_VARS[tone], ...style }
    : { color: ICON_COLOR_VARS[color], ...style };

  const classes = [
    'icon',
    `icon--${size}`,
    inset ? 'icon--inset' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const svg = <Svg className="icon__svg" aria-hidden />;

  return (
    <span className={classes} style={colorStyle} {...props}>
      {inset ? (
        <span className="icon__viewbox">
          <span className="icon__shape">{svg}</span>
        </span>
      ) : (
        svg
      )}
      {label ? <span className="visually-hidden">{label}</span> : null}
    </span>
  );
}
