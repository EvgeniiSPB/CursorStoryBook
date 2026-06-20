import type { CSSProperties } from 'react';
import { Icon } from '../../Icon';
import { getIconFigmaColor, type IconName20 } from '../../Icon/types';
import { menuAtomIconGlyphSize } from './types';

type MenuAtomIconProps = {
  name: IconName20;
  active?: boolean;
};

/** Figma `icon20 - container` (6058:2703): 20×20 slot, glyph at ic_20 shape size. */
export function MenuAtomIcon({ name, active = false }: MenuAtomIconProps) {
  const figmaColor = getIconFigmaColor(name);
  const { width, height } = menuAtomIconGlyphSize(name);

  const glyphStyle = {
    '--menu-atom-icon-glyph-w': `${width}px`,
    '--menu-atom-icon-glyph-h': `${height}px`,
  } as CSSProperties;

  if (!active && figmaColor === 'brand') {
    return (
      <span className="menu-atom__icon-slot" style={glyphStyle} aria-hidden>
        <Icon
          name={name}
          size={20}
          color="brand"
          className="menu-atom__icon menu-atom__icon--glyph"
        />
      </span>
    );
  }

  return (
    <span className="menu-atom__icon-slot" style={glyphStyle} aria-hidden>
      <Icon
        name={name}
        size={20}
        inheritColor
        className="menu-atom__icon menu-atom__icon--glyph"
      />
    </span>
  );
}
