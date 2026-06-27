import { createElement, type ReactElement } from 'react';

// Inline SVG components used by RightSidePanel atoms. Written with `createElement`
// directly (no JSX) so the Storybook manager bundler (esbuild, classic JSX) can
// process them without requiring `import React` or jsx-runtime in this file.

const svgProps = {
  width: '100%',
  height: '100%',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
} as const;

export function CloseIcon(): ReactElement {
  // Glyph is 13.5×13.5 per Figma node 444:11618 (~14.06% inset inside a 20px
  // icon slot). Explicit width/height override the default 100% so the X
  // doesn't fill the slot.
  return createElement(
    'svg',
    {
      ...svgProps,
      width: '13.5',
      height: '13.5',
      viewBox: '0 0 13.5 13.5',
      'aria-hidden': 'true',
    },
    createElement('path', {
      d: 'M13.2803 1.28033C13.5732 0.987437 13.5732 0.512563 13.2803 0.21967C12.9874 -0.0732233 12.5126 -0.0732233 12.2197 0.21967L6.75 5.68934L1.28033 0.21967C0.987437 -0.0732233 0.512563 -0.0732233 0.21967 0.21967C-0.0732233 0.512563 -0.0732233 0.987437 0.21967 1.28033L5.68934 6.75L0.219671 12.2197C-0.0732227 12.5126 -0.0732227 12.9874 0.219671 13.2803C0.512563 13.5732 0.987438 13.5732 1.28033 13.2803L6.75 7.81066L12.2197 13.2803C12.5126 13.5732 12.9874 13.5732 13.2803 13.2803C13.5732 12.9874 13.5732 12.5126 13.2803 12.2197L7.81066 6.75L13.2803 1.28033Z',
      fill: 'currentColor',
    }),
  );
}

export function PlusIcon(): ReactElement {
  return createElement(
    'svg',
    { ...svgProps, viewBox: '0 0 15.6 15.6', 'aria-hidden': 'true' },
    createElement('path', {
      d: 'M8.6 0.8C8.6 0.358172 8.24183 0 7.8 0C7.35817 0 7 0.358172 7 0.8V7H0.8C0.358172 7 0 7.35817 0 7.8C0 8.24183 0.358172 8.6 0.8 8.6H7V14.8C7 15.2418 7.35817 15.6 7.8 15.6C8.24183 15.6 8.6 15.2418 8.6 14.8V8.6H14.8C15.2418 8.6 15.6 8.24183 15.6 7.8C15.6 7.35817 15.2418 7 14.8 7H8.6V0.8Z',
      fill: 'currentColor',
    }),
  );
}

export function MinusIcon(): ReactElement {
  return createElement(
    'svg',
    { ...svgProps, viewBox: '0 0 15.6 1.6', 'aria-hidden': 'true' },
    createElement('path', {
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      d: 'M0 0.8C0 0.358172 0.358172 0 0.8 0H14.8C15.2418 0 15.6 0.358172 15.6 0.8C15.6 1.24183 15.2418 1.6 14.8 1.6H0.8C0.358172 1.6 0 1.24183 0 0.8Z',
      fill: 'currentColor',
    }),
  );
}

/** Cog/gear icon (24×24 viewBox, thin outlined silhouette — matches the
 *  Figma `configurate` glyph). Used by the re-open trigger that lets the
 *  user summon the RightSidePanel after closing it manually. */
export function GearIcon(): ReactElement {
  return createElement(
    'svg',
    {
      ...svgProps,
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      'aria-hidden': 'true',
    },
    createElement('path', {
      d: 'm13.18 4 .45 2.25c.93.27 1.81.74 2.55 1.46l2.16-.73 1.18 2.04-1.72 1.52a6 6 0 0 1 0 2.92l1.72 1.52-1.18 2.04-2.16-.73a6 6 0 0 1-2.55 1.46L13.18 20h-2.36l-.45-2.25a6 6 0 0 1-2.55-1.46l-2.16.73-1.18-2.04 1.72-1.52a6 6 0 0 1 0-2.92L4.48 9.02l1.18-2.04 2.16.73a6 6 0 0 1 2.55-1.46L10.82 4zM14 3h-4l-.5 2.49q-1.05.39-1.91 1.08l-2.38-.8-2 3.46 1.9 1.67a7 7 0 0 0 0 2.2l-1.9 1.67 2 3.46 2.38-.8q.85.69 1.91 1.08L10 21h4l.5-2.49q1.05-.39 1.91-1.08l2.38.8 2-3.46-1.9-1.67q.18-1.1 0-2.2l1.9-1.67-2-3.46-2.38.8A7 7 0 0 0 14.5 5.5zm-2 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4m0-1a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
      fill: 'currentColor',
    }),
  );
}

export function ResetIcon(): ReactElement {
  return createElement(
    'svg',
    { ...svgProps, viewBox: '0 0 16 16', 'aria-hidden': 'true' },
    createElement('path', {
      d: 'M12.124 3.87468C11.5824 3.33298 10.9393 2.90326 10.2316 2.61009C9.52395 2.31691 8.76542 2.16602 7.99935 2.16602C7.23328 2.16602 6.47478 2.31691 5.76706 2.61009C5.05935 2.90326 4.41632 3.33298 3.87468 3.87468L3.50502 4.24428L2.34242 3.08168V6.11375H5.37448L4.21208 4.95135L4.58168 4.58168C5.37238 3.79099 6.41279 3.29892 7.52562 3.18932C8.63848 3.07972 9.75488 3.35938 10.6846 3.98063C11.6144 4.60188 12.2999 5.5263 12.6245 6.59637C12.9491 7.66642 12.8927 8.81595 12.4647 9.84902C12.0368 10.8821 11.2639 11.7349 10.2777 12.262C9.29155 12.7891 8.15308 12.958 7.05642 12.7398C5.95966 12.5217 4.9725 11.93 4.26311 11.0656C3.55373 10.2012 3.16601 9.11755 3.16602 7.99935H2.16602C2.16598 8.95868 2.40253 9.90321 2.85472 10.7492C3.30691 11.5953 3.96078 12.3167 4.7584 12.8497C5.55604 13.3827 6.4728 13.7108 7.42748 13.8048C8.38222 13.8989 9.34535 13.756 10.2316 13.3889C11.1179 13.0218 11.9 12.4417 12.5086 11.7002C13.1171 10.9587 13.5335 10.0784 13.7206 9.13755C13.9077 8.19668 13.8599 7.22415 13.5815 6.30616C13.3029 5.38815 12.8023 4.553 12.124 3.87468Z',
      fill: 'currentColor',
    }),
  );
}
