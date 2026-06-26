import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RightSidePanel } from './RightSidePanel';
import { buildControlsFromArgTypes, type ArgTypesLike } from './build-controls';

const noop = () => {};

const meta = {
  title: 'Templates/RightSidePanel',
  component: RightSidePanel,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    controls: [],
    args: {},
    initialArgs: {},
    onUpdate: noop,
    onReset: noop,
    onClose: noop,
  },
} satisfies Meta<typeof RightSidePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Phase 1 host: renders RightSidePanel inside a 375-wide column so the canvas
 *  mirrors the real Storybook layout (no addon-shell padding). Owns args + reset
 *  state locally — Phase 2 will swap this for `api.updateStoryArgs`. */
function Phase1Host({
  argTypes,
  initialArgs,
}: {
  argTypes: ArgTypesLike;
  initialArgs: Record<string, unknown>;
}) {
  const [args, setArgs] = useState<Record<string, unknown>>(initialArgs);
  const [closed, setClosed] = useState(false);
  const controls = useMemo(
    () => buildControlsFromArgTypes(argTypes, args),
    [argTypes, args],
  );

  if (closed) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          color: '#1d2126',
          fontFamily: "'PP Neue Montreal', system-ui, sans-serif",
          fontSize: 14,
        }}
      >
        <button
          type="button"
          onClick={() => setClosed(false)}
          style={{
            padding: '8px 16px',
            border: '1px solid rgba(29, 33, 38, 0.2)',
            borderRadius: 999,
            background: '#fff',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 13,
          }}
        >
          re-open panel
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        background: 'var(--showcase-canvas-bg, #eaeaea)',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <RightSidePanel
        controls={controls}
        args={args}
        initialArgs={initialArgs}
        onUpdate={(name, value) => setArgs((prev) => ({ ...prev, [name]: value }))}
        onReset={() => setArgs(initialArgs)}
        onClose={() => setClosed(true)}
      />
    </div>
  );
}

/** Empty state — story without supported argTypes. */
export const Empty: Story = {
  render: () => <Phase1Host argTypes={{}} initialArgs={{}} />,
};

/** Mirrors `Components/Badges/Text` argTypes — 1 select + 1 toggle + 1 text input. */
const BADGE_TEXT_ARG_TYPES: ArgTypesLike = {
  type: {
    control: { type: 'select' },
    options: ['filled', 'outlined', 'brand', 'tonned'],
  },
  icon: { control: { type: 'boolean' } },
  children: { control: { type: 'text' } },
};

const BADGE_TEXT_INITIAL = {
  children: 'Value',
  type: 'filled',
  icon: true,
};

export const RealBadgeText: Story = {
  name: 'Real argTypes — BadgeText',
  render: () => (
    <Phase1Host argTypes={BADGE_TEXT_ARG_TYPES} initialArgs={BADGE_TEXT_INITIAL} />
  ),
};

/** Mirrors `Components/Checkboxes/CheckboxToggle` argTypes — 2 toggles + 1 select. */
const CHECKBOX_TOGGLE_ARG_TYPES: ArgTypesLike = {
  active: { control: { type: 'boolean' } },
  disabled: { control: { type: 'boolean' } },
  state: {
    control: { type: 'select' },
    options: ['normal', 'hover', 'click'],
  },
};

const CHECKBOX_TOGGLE_INITIAL = {
  active: false,
  disabled: false,
  state: 'normal',
};

export const RealCheckboxToggle: Story = {
  name: 'Real argTypes — CheckboxToggle',
  render: () => (
    <Phase1Host
      argTypes={CHECKBOX_TOGGLE_ARG_TYPES}
      initialArgs={CHECKBOX_TOGGLE_INITIAL}
    />
  ),
};

/** Long list — verifies scroll, sticky header, and many SelectRow auto-collapse. */
const LONG_ARG_TYPES: ArgTypesLike = {
  title: { control: { type: 'text' } },
  subtitle: { control: { type: 'text' } },
  count: { control: { type: 'number' } },
  variant: {
    control: { type: 'select' },
    options: ['primary', 'secondary', 'tertiary', 'ghost'],
  },
  size: {
    control: { type: 'radio' },
    options: ['s', 'm', 'l', 'xl'],
  },
  density: {
    control: { type: 'inline-radio' },
    options: ['compact', 'cozy', 'comfortable'],
  },
  align: {
    control: { type: 'select' },
    options: ['start', 'center', 'end'],
  },
  disabled: { control: { type: 'boolean' } },
  loading: { control: { type: 'boolean' } },
  bordered: { control: { type: 'boolean' } },
  rounded: { control: { type: 'boolean' } },
  // Extra selects to force scrolling on tall viewports.
  tone: {
    control: { type: 'select' },
    options: ['neutral', 'accent', 'success', 'warning', 'danger'],
  },
  weight: {
    control: { type: 'select' },
    options: ['regular', 'medium', 'semibold', 'bold'],
  },
  shape: {
    control: { type: 'select' },
    options: ['square', 'rounded', 'pill', 'circle'],
  },
  elevation: {
    control: { type: 'select' },
    options: ['flat', 'low', 'medium', 'high'],
  },
  motion: {
    control: { type: 'select' },
    options: ['none', 'subtle', 'standard', 'expressive'],
  },
  spacing: {
    control: { type: 'select' },
    options: ['none', 'xs', 's', 'm', 'l', 'xl'],
  },
  border: {
    control: { type: 'select' },
    options: ['none', 'hairline', 'solid', 'dashed', 'dotted'],
  },
  corner: {
    control: { type: 'select' },
    options: ['sharp', 'soft', 'round', 'pill'],
  },
  divider: {
    control: { type: 'select' },
    options: ['none', 'thin', 'thick'],
  },
  iconPlacement: {
    control: { type: 'select' },
    options: ['start', 'end', 'both', 'none'],
  },
  // Unsupported types are silently skipped — verifies skip-list:
  bg: { control: { type: 'color' } },
  publishedAt: { control: { type: 'date' } },
  // table.disable hides this one entirely:
  internalId: { control: { type: 'text' }, table: { disable: true } },
  // control: false hides this one too:
  ref: { control: false },
};

const LONG_INITIAL = {
  title: 'Section heading',
  subtitle: '',
  count: 12,
  variant: 'primary',
  size: 'm',
  density: 'cozy',
  align: 'start',
  disabled: false,
  loading: false,
  bordered: true,
  rounded: false,
  tone: 'neutral',
  weight: 'regular',
  shape: 'rounded',
  elevation: 'flat',
  motion: 'standard',
  spacing: 'm',
  border: 'solid',
  corner: 'soft',
  divider: 'thin',
  iconPlacement: 'start',
};

export const LongList: Story = {
  name: 'Long list (scroll + skip-list)',
  render: () => <Phase1Host argTypes={LONG_ARG_TYPES} initialArgs={LONG_INITIAL} />,
};
