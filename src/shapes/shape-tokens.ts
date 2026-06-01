import type { ShapeColorRole, ShapeFigmaTheme, ShapeState, ShapeType } from './types';

type SurfaceStyle = {
  backgroundColor?: string;
  boxShadow?: string;
};

/** Semantic token prefix per Figma color role (warning → error in Figma vars). */
const COLOR_TOKEN_PREFIX: Record<ShapeColorRole, string> = {
  primary: 'primary',
  primaryInverted: 'primary-inverted',
  constant: 'constant',
  constantInverted: 'constant-inverted',
  brand: 'brand-constant',
  success: 'success',
  warning: 'error',
  info: 'info',
};

/**
 * On Figma dark boards, `primaryInverted` shapes use `primary/*` (white), not `primaryInverted/*`.
 */
function resolveTokenPrefix(color: ShapeColorRole, theme: ShapeFigmaTheme): string {
  if (theme === 'dark' && color === 'primaryInverted') {
    return 'primary';
  }
  return COLOR_TOKEN_PREFIX[color];
}

function filledFill(color: ShapeColorRole, state: ShapeState, theme: ShapeFigmaTheme): string {
  const prefix = resolveTokenPrefix(color, theme);
  const step = state === 'normal' ? 'primary' : state === 'hover' ? 'secondary' : 'tertiary';
  const fallbacks: Record<string, Record<string, string>> = {
    primary: { primary: '#34373c', secondary: '#2a2d32', tertiary: '#0f1216' },
    'primary-inverted': {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.9)',
      tertiary: 'rgba(255,255,255,0.8)',
    },
    constant: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.9)',
      tertiary: 'rgba(255,255,255,0.8)',
    },
    'constant-inverted': { primary: '#34373c', secondary: '#2a2d32', tertiary: '#0f1216' },
    'brand-constant': { primary: '#a30f33', secondary: '#93002b', tertiary: '#800024' },
    success: { primary: '#34373c', secondary: '#2a2d32', tertiary: '#0f1216' },
    error: { primary: '#a70025', secondary: '#940120', tertiary: '#800020' },
    info: { primary: '#34373c', secondary: '#2a2d32', tertiary: '#0f1216' },
  };
  const fb = fallbacks[prefix]?.[step] ?? '#34373c';
  return `var(--${prefix}-${step}, ${fb})`;
}

function outlinedBorder(color: ShapeColorRole, state: ShapeState, theme: ShapeFigmaTheme): string {
  const prefix = resolveTokenPrefix(color, theme);
  const step = state === 'normal' ? '20' : state === 'hover' ? '24' : '28';
  const fallbacks: Record<string, Record<string, string>> = {
    primary: {
      '20': 'rgba(52,55,60,0.2)',
      '24': 'rgba(52,55,60,0.24)',
      '28': 'rgba(52,55,60,0.28)',
    },
    'primary-inverted': {
      '20': 'rgba(255,255,255,0.2)',
      '24': 'rgba(255,255,255,0.24)',
      '28': 'rgba(255,255,255,0.28)',
    },
    constant: {
      '20': 'rgba(255,255,255,0.2)',
      '24': 'rgba(255,255,255,0.24)',
      '28': 'rgba(255,255,255,0.28)',
    },
    'constant-inverted': {
      '20': 'rgba(52,55,60,0.2)',
      '24': 'rgba(52,55,60,0.24)',
      '28': 'rgba(52,55,60,0.28)',
    },
    'brand-constant': {
      '20': 'rgba(163,15,51,0.2)',
      '24': 'rgba(163,15,51,0.24)',
      '28': 'rgba(163,15,51,0.28)',
    },
    success: {
      '20': 'rgba(52,55,60,0.2)',
      '24': 'rgba(52,55,60,0.24)',
      '28': 'rgba(52,55,60,0.28)',
    },
    error: {
      '20': 'rgba(167,0,37,0.2)',
      '24': 'rgba(167,0,37,0.24)',
      '28': 'rgba(167,0,37,0.28)',
    },
    info: {
      '20': 'rgba(52,55,60,0.2)',
      '24': 'rgba(52,55,60,0.24)',
      '28': 'rgba(52,55,60,0.28)',
    },
  };
  const fb = fallbacks[prefix]?.[step] ?? 'rgba(52,55,60,0.2)';
  return `inset 0 0 0 1px var(--${prefix}-${step}, ${fb})`;
}

/**
 * Figma tonned + segment metallic: `brandConstant/8` aliases segment steps.
 * Light board (`314:1617`): 8 / 12 / 16 → #2F5E74 @ 8–16%.
 * Dark board (`314:1633`): 8 / 12 / 16 → segment 50 / 40 / 36 → #2F5E74 @ 50–36%.
 */
const TONNED_METALLIC_SEGMENT_STEP: Record<
  ShapeFigmaTheme,
  Record<ShapeState, '8' | '12' | '16' | '36' | '40' | '50'>
> = {
  light: { normal: '8', hover: '12', click: '16' },
  dark: { normal: '50', hover: '40', click: '36' },
};

const TONNED_METALLIC_FALLBACK: Record<string, string> = {
  '8': 'rgba(47, 94, 116, 0.08)',
  '12': 'rgba(47, 94, 116, 0.12)',
  '16': 'rgba(47, 94, 116, 0.16)',
  '36': 'rgba(47, 94, 116, 0.36)',
  '40': 'rgba(47, 94, 116, 0.4)',
  '50': 'rgba(47, 94, 116, 0.5)',
};

function tonnedFill(state: ShapeState, theme: ShapeFigmaTheme): string {
  const step = TONNED_METALLIC_SEGMENT_STEP[theme][state];
  return `var(--segment-${step}, ${TONNED_METALLIC_FALLBACK[step]})`;
}

/** Figma `meta` board uses meta/body for neutral radius reference. */
export function getMetaShapeSurface(): SurfaceStyle {
  return {
    backgroundColor: 'var(--meta-body, rgba(52, 55, 60, 0.12))',
  };
}

export function getShapeSurfaceStyle(
  type: ShapeType,
  color: ShapeColorRole,
  state: ShapeState,
  theme: ShapeFigmaTheme,
): SurfaceStyle {
  if (type === 'filled') {
    return { backgroundColor: filledFill(color, state, theme) };
  }
  if (type === 'outlined') {
    return {
      backgroundColor: 'transparent',
      boxShadow: outlinedBorder(color, state, theme),
    };
  }
  return { backgroundColor: tonnedFill(state, theme) };
}
