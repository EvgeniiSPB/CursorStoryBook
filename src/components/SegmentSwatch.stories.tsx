import type { Meta, StoryObj } from '@storybook/react-vite';

function SegmentSwatch() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spaces-static-300, 12px)',
        maxWidth: 320,
      }}
    >
      <div
        style={{
          height: 80,
          borderRadius: 'var(--x-base-200, 8px)',
          backgroundColor: 'var(--segment-primary)',
        }}
      />
      <div style={{ display: 'flex', gap: 8 }}>
        <div
          title="segment-4"
          style={{
            flex: 1,
            height: 32,
            borderRadius: 4,
            backgroundColor: 'var(--segment-4)',
          }}
        />
        <div
          title="segment-24"
          style={{
            flex: 1,
            height: 32,
            borderRadius: 4,
            backgroundColor: 'var(--segment-24)',
          }}
        />
        <div
          title="segment-50"
          style={{
            flex: 1,
            height: 32,
            borderRadius: 4,
            backgroundColor: 'var(--segment-50)',
          }}
        />
      </div>
      <p style={{ margin: 0, fontSize: 'var(--font-sizes-body-s)' }}>
        Переключите <strong>Segment</strong> в toolbar — меняется{' '}
        <code>--segment-primary</code> и шкала прозрачности.
      </p>
    </div>
  );
}

const meta = {
  title: 'Tokens/Segment',
  component: SegmentSwatch,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SegmentSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {
  parameters: {
    docs: {
      source: {
        code: [
          `/* Segment tokens are exposed as CSS variables:`,
          ` * --segment-primary, --segment-4, --segment-24, --segment-50`,
          ` * Switch the active segment via [data-segment="metallic"] etc. */`,
          ``,
          `<div data-segment="metallic" style={{ padding: 24 }}>`,
          `  <div style={{ height: 80, background: 'var(--segment-primary)' }} />`,
          `</div>`,
        ].join('\n'),
      },
    },
  },
};
