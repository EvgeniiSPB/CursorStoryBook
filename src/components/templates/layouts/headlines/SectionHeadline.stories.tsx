import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { FIGMA_BODY_FONT_MODE_SLUG } from '../../../../tokens/font-mode-options';
import { LayoutSwapPlaceholder } from '../shared/LayoutSwapPlaceholder';
import { layoutSwapRowWidthStyle } from '../shared/LayoutSwapRow';
import { SWAP, layoutSlotOptions } from '../shared/slot-renderers';
import {
  LAYOUT_BOARD_PADDING_PX,
  LAYOUT_CONTENT_WIDTH_PX,
} from '../shared/types';
import '../shared/layouts-showcase.css';
import { SectionHeadline } from './SectionHeadline';
import { SectionHeadlinePaddingRuler } from './SectionHeadlinePaddingRuler';
import {
  HEADLINES_FIGMA_NODE_ID,
  HEADLINES_SLOT_SECTION_HEADLINE,
  SECTION_HEADLINE_DEFAULT_BUTTON_TEXT,
  SECTION_HEADLINE_DEFAULT_HEADLINE_TEXT,
  SECTION_HEADLINE_T_PADDING_PX,
} from './types';

const showcaseCanvas: Decorator = (Story) => (
  <div className="layouts-showcase-canvas" data-font-mode={FIGMA_BODY_FONT_MODE_SLUG}>
    <Story />
  </div>
);

const boardStyle = {
  '--layouts-board-width': LAYOUT_CONTENT_WIDTH_PX,
  '--layouts-board-padding': LAYOUT_BOARD_PADDING_PX,
} as CSSProperties;

const HEADLINES_SLOT_WHITELIST = [HEADLINES_SLOT_SECTION_HEADLINE] as const;

type PlaygroundArgs = {
  slot: string;
  tPadding: boolean;
  button: boolean;
  headlineText: string;
  buttonText: string;
};

const meta = {
  title: 'Templates/Layouts/Headlines',
  component: SectionHeadline,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
    design: {
      type: 'figma',
      url: `https://www.figma.com/design/v38i2xdV8rVi9YHFzD0qqx/04---templates?node-id=${HEADLINES_FIGMA_NODE_ID.replace(':', '-')}`,
    },
  },
} satisfies Meta<typeof SectionHeadline>;

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { SectionHeadline } from '@/components/templates/layouts/headlines/SectionHeadline';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <SectionHeadline headlineText="Value" buttonText="Value" tPadding button />`,
          `    </div>`,
          `  );`,
          `};`,
          ``,
          `const root = document.getElementById('root');`,
          `if (root) createRoot(root).render(<App />);`,
        ].join('\n'),
      },
    },
  },
  args: {
    slot: SWAP,
    tPadding: true,
    button: true,
    headlineText: SECTION_HEADLINE_DEFAULT_HEADLINE_TEXT,
    buttonText: SECTION_HEADLINE_DEFAULT_BUTTON_TEXT,
  },
  argTypes: {
    slot: {
      name: 'slot',
      control: {
        type: 'select',
        labels: {
          [SWAP]: 'swap (headline)',
          [HEADLINES_SLOT_SECTION_HEADLINE]: 'section - headline',
        },
      },
      options: layoutSlotOptions(HEADLINES_SLOT_WHITELIST),
    },
    tPadding: {
      control: 'boolean',
      if: { arg: 'slot', eq: HEADLINES_SLOT_SECTION_HEADLINE },
    },
    button: {
      control: 'boolean',
      if: { arg: 'slot', eq: HEADLINES_SLOT_SECTION_HEADLINE },
    },
    headlineText: {
      name: 'headline',
      control: 'text',
      if: { arg: 'slot', eq: HEADLINES_SLOT_SECTION_HEADLINE },
    },
    buttonText: {
      name: 'button label',
      control: 'text',
      if: { arg: 'slot', eq: HEADLINES_SLOT_SECTION_HEADLINE },
    },
  },
  render: ({ slot, tPadding, button, headlineText, buttonText }) => (
    <div className="layouts-showcase-section layouts-showcase-section--board" style={boardStyle}>
      <div style={layoutSwapRowWidthStyle}>
        {slot === SWAP ? (
          <LayoutSwapPlaceholder kind="headline" />
        ) : (
          <div style={{ position: 'relative', width: '100%' }}>
            {tPadding ? <SectionHeadlinePaddingRuler px={SECTION_HEADLINE_T_PADDING_PX} /> : null}
            <SectionHeadline
              tPadding={tPadding}
              button={button}
              headlineText={headlineText}
              buttonText={buttonText}
            />
          </div>
        )}
      </div>
    </div>
  ),
};
