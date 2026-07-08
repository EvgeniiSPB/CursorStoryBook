// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
void React;
import { useEffect, useRef, useState, type HTMLAttributes } from 'react';
import { PanelHeader } from './PanelHeader';
import { ToggleRow } from './ToggleRow';
import { SelectRow } from './SelectRow';
import { InputRow } from './InputRow';
import { Dropdown3rdLvl } from '../left-side-bar/Dropdown3rdLvl';
import type { Control } from './types';
import './right-side-panel.css';

export interface RightSidePanelProps
  extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  controls: Control[];
  /** Current arg values (controlled). Keys match `Control.name`. */
  args: Record<string, unknown>;
  /** Snapshot of initial args — used to compute the Reset-button disabled state. */
  initialArgs: Record<string, unknown>;
  /** Fires on every control value change. */
  onUpdate: (name: string, value: unknown) => void;
  /** Fires when the user clicks "Reset all". */
  onReset: () => void;
  /** Fires when the user clicks the close X. */
  onClose: () => void;
}

/** RightSidePanel composer — Figma node 6553:41035.
 *  Owns the open/close state for SelectRow controls (only one open at a time —
 *  per-panel spec; differs from LeftSideBar where many groups can be open). */
export function RightSidePanel({
  controls,
  args,
  initialArgs,
  onUpdate,
  onReset,
  onClose,
  className,
  ...rest
}: RightSidePanelProps) {
  // Auto-collapse: at most one SelectRow open at any time.
  const [openSelectName, setOpenSelectName] = useState<string | null>(null);

  // Detects when the panel is scrolled past the top so PanelHeader can show a
  // thin bottom border (visual cue that content is hiding underneath).
  const panelRef = useRef<HTMLElement>(null);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const handleScroll = () => setStuck(panel.scrollTop > 0);
    handleScroll();
    panel.addEventListener('scroll', handleScroll, { passive: true });
    return () => panel.removeEventListener('scroll', handleScroll);
  }, []);

  // "Dirty once" — once the user changes any arg, Reset stays enabled until
  // they explicitly reset or close the panel (even if values happen to land
  // back on the initial set). Cleared automatically when `initialArgs` changes
  // (story switch — Phase 2 integration).
  //
  // We compare `initialArgs` by serialised content (not reference) because the
  // Phase 2 manager wrapper re-snapshots `storyData` on every 200ms poll, which
  // gives `initialArgs` a fresh object reference each tick. A naive
  // `[initialArgs]` dep would re-fire this effect ~5×/s and wipe `dirty` out
  // from under the user.
  const initialArgsKey = JSON.stringify(initialArgs);
  const [dirty, setDirty] = useState(false);
  useEffect(() => {
    setDirty(false);
  }, [initialArgsKey]);

  const resetDisabled = !dirty || controls.length === 0;

  const handleUpdate = (name: string, value: unknown) => {
    setDirty(true);
    onUpdate(name, value);
  };
  const handleReset = () => {
    setDirty(false);
    onReset();
  };
  const handleClose = () => {
    setDirty(false);
    onClose();
  };

  const classes = [
    'rsp-panel',
    stuck ? 'rsp-panel--stuck' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav ref={panelRef} className={classes} aria-label="Story controls" {...rest}>
      <PanelHeader
        resetDisabled={resetDisabled}
        onReset={handleReset}
        onClose={handleClose}
      />
      <div className="rsp-panel__body">
        {controls.length === 0 ? (
          <div className="rsp-panel__empty">No controls for this story</div>
        ) : (
          controls.map((control, idx) => {
            const firstChild = idx === 0;
            if (control.kind === 'toggle') {
              return (
                <ToggleRow
                  key={control.name}
                  label={control.label ?? control.name}
                  on={Boolean(args[control.name] ?? control.value)}
                  firstChild={firstChild}
                  onChange={(next) => handleUpdate(control.name, next)}
                />
              );
            }
            if (control.kind === 'input') {
              // Fallback to `control.value` (which build-controls populates
              // from `argType.defaultValue` when `args[name]` is missing) so
              // an input isn't stuck empty/inactive on stories that only
              // declare a default without an explicit arg.
              const value =
                args[control.name] != null
                  ? String(args[control.name])
                  : control.value;
              return (
                <InputRow
                  key={control.name}
                  label={control.label ?? control.name}
                  value={value}
                  inputType={control.inputType}
                  firstChild={firstChild}
                  onChange={(next) =>
                    handleUpdate(
                      control.name,
                      control.inputType === 'number' && next !== ''
                        ? Number(next)
                        : next,
                    )
                  }
                />
              );
            }
            // select
            const currentValue = args[control.name] ?? control.value;
            const hasSelection = currentValue !== undefined && currentValue !== null;
            const isOpen = openSelectName === control.name;
            return (
              <SelectRow
                key={control.name}
                label={control.label ?? control.name}
                open={isOpen}
                firstChild={firstChild}
                onOpenChange={(next) =>
                  setOpenSelectName(next ? control.name : null)
                }
              >
                {control.options.map((option) => {
                  const isActive = currentValue === option;
                  const state = hasSelection
                    ? isActive
                      ? 'active'
                      : 'nonActive'
                    : 'rest';
                  return (
                    <Dropdown3rdLvl
                      key={String(option)}
                      label={String(option)}
                      state={state}
                      onClick={() => handleUpdate(control.name, option)}
                    />
                  );
                })}
              </SelectRow>
            );
          })
        )}
      </div>
    </nav>
  );
}
