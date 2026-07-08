import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../../storybook/showcase-decorators';
import { TextParagraph } from '../../atoms/text-paragraph/TextParagraph';
import { TextTitle } from './TextTitle';
import { TextQuestion } from './TextQuestion';
import { TextAnswer } from './TextAnswer';
import { TextInitials } from './TextInitials';
import { TextListNumbered } from './TextListNumbered';
import { TextListBulleted } from './TextListBulleted';
import { TextAuthors } from './TextAuthors';
import { ImageSingle } from './ImageSingle';
import {
  DETAILS_CENTER_FIGMA_NODE_ID,
  DETAILS_CENTER_WIDTH_PX,
  DETAILS_PARAGRAPH_TEXT,
} from './constants';

const meta = {
  title: 'Constructors/Article/Center',
  component: TextTitle,
  tags: ['autodocs'],
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`details / center\` (${DETAILS_CENTER_FIGMA_NODE_ID}) — content blocks for the constructor middle slot (fixed **${DETAILS_CENTER_WIDTH_PX}px**). Built from existing atoms (TextParagraph, TextCore, TextHeadline, BadgeDigits, DividerHorizontal, ImageContainerFixedAspectRatio).`,
      },
    },
  },
} satisfies Meta<typeof TextTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

const boardStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  width: DETAILS_CENTER_WIDTH_PX,
  maxWidth: '100%',
};

export const Gallery: Story = {
  name: 'All blocks',
  render: () => (
    <div className="showcase-layout-section showcase-layout-section--board">
      <div style={boardStyle}>
        <TextTitle />
        <div className="details-paragraph-wide">
          <TextParagraph typography="bodyL" fontWeight="regular" text={DETAILS_PARAGRAPH_TEXT} />
        </div>
        <TextQuestion />
        <TextAnswer />
        <TextInitials />
        <TextListNumbered />
        <TextListBulleted />
        <TextAuthors />
        <ImageSingle />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { TextTitle, TextQuestion, TextAnswer } from '@/components/details/center';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 32 }}>`,
          `      <TextTitle />`,
          `      <TextQuestion />`,
          `      <TextAnswer />`,
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
};
