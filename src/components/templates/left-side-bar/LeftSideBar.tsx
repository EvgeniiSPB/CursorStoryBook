// React required for classic JSX in Storybook manager bundle (uses Storybook-bundled React 18 via global externals).
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
void React; // satisfy noUnusedLocals — React is used at runtime by classic JSX transform
import { useEffect, useState, type HTMLAttributes } from 'react';
import { DropdownHeading } from './DropdownHeading';
import { Dropdown1stLvl } from './Dropdown1stLvl';
import { Dropdown2ndLvl } from './Dropdown2ndLvl';
import { Dropdown3rdLvl } from './Dropdown3rdLvl';
import { Logo } from './Logo';
import type { SidebarSection } from './types';
import './left-side-bar.css';

export interface LeftSideBarProps
  extends Omit<HTMLAttributes<HTMLElement>, 'onSelect' | 'children'> {
  sections: SidebarSection[];
  /** Storybook story id of the currently selected leaf. */
  activeId?: string;
  /** Fired when user clicks a 3rd-lvl leaf row. */
  onSelect?: (id: string) => void;
  /** Item ids (1st or 2nd lvl) that should be open on first render. */
  defaultOpenItemIds?: readonly string[];
  /**
   * If set, the open/close state of each 1st/2nd-lvl row is persisted to
   * `sessionStorage` under this key. Restored on mount (merged with the path
   * to `activeId` and any `defaultOpenItemIds`).
   *
   * `sessionStorage` is per-tab: reload in the same tab preserves the open
   * state, opening the URL in a new tab starts fresh (only the path to the
   * active story is auto-expanded).
   */
  storageKey?: string;
  /** Optional click handler for the top-left logo. When provided, the logo
   *  becomes a button — used to navigate to the welcome / landing entry. */
  onLogoClick?: () => void;
}

/** Walks the sections tree to find the chain of 1st/2nd-lvl ids that
 *  contain the given leaf id — used to auto-expand the path to the active
 *  story on mount and on navigation. */
function findPathToLeaf(
  sections: SidebarSection[],
  leafId: string,
): string[] {
  for (const section of sections) {
    for (const item of section.items) {
      if (item.layout === 'flat') {
        if (item.children.some((l) => l.id === leafId)) return [item.id];
      } else {
        for (const child of item.children ?? []) {
          if (child.children.some((l) => l.id === leafId)) {
            return [item.id, child.id];
          }
        }
      }
    }
  }
  return [];
}

function readPersistedIds(key?: string): string[] {
  if (!key || typeof window === 'undefined') return [];
  try {
    const raw = window.sessionStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((v): v is string => typeof v === 'string')
      : [];
  } catch {
    return [];
  }
}

export function LeftSideBar({
  sections,
  activeId,
  onSelect,
  defaultOpenItemIds = [],
  storageKey,
  onLogoClick,
  className,
  ...rest
}: LeftSideBarProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(() => {
    const initial = new Set<string>(defaultOpenItemIds);
    readPersistedIds(storageKey).forEach((id) => initial.add(id));
    if (activeId) {
      findPathToLeaf(sections, activeId).forEach((id) => initial.add(id));
    }
    return initial;
  });

  // Persist on every change to sessionStorage (per-tab scope).
  useEffect(() => {
    if (!storageKey || typeof window === 'undefined') return;
    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify([...openIds]));
    } catch {
      /* ignore quota / privacy-mode errors */
    }
  }, [openIds, storageKey]);

  // When the active story changes (e.g. user clicks a leaf, follows a deep
  // link, or hits browser back), reveal the path to it without collapsing any
  // group the user opened manually.
  useEffect(() => {
    if (!activeId) return;
    const path = findPathToLeaf(sections, activeId);
    if (path.length === 0) return;
    setOpenIds((prev) => {
      if (path.every((id) => prev.has(id))) return prev;
      const next = new Set(prev);
      path.forEach((id) => next.add(id));
      return next;
    });
  }, [activeId, sections]);

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const classes = ['left-side-bar', className].filter(Boolean).join(' ');

  return (
    <nav className={classes} aria-label="Sidebar navigation" {...rest}>
      <Logo onClick={onLogoClick} />
      {sections.map((section) => (
        <div className="left-side-bar__section" key={section.id}>
          <DropdownHeading
            label={section.heading.label}
            count={section.heading.count}
            badge={section.heading.badge ?? 'metallic'}
          />
          {section.items.map((item, itemIdx) => {
            const isOpen = openIds.has(item.id);

            const leafState = (leafId: string) =>
              activeId === leafId
                ? 'active'
                : activeId
                  ? 'nonActive'
                  : 'rest';

            // Flat layout — children are leaves directly (Assets/Icons exception).
            if (item.layout === 'flat') {
              return (
                <Dropdown1stLvl
                  key={item.id}
                  label={item.label}
                  open={isOpen}
                  firstChild={itemIdx === 0}
                  layout="flat"
                  onClick={() => toggle(item.id)}
                >
                  {item.children.map((leaf) => (
                    <Dropdown3rdLvl
                      key={leaf.id}
                      label={leaf.label}
                      state={leafState(leaf.id)}
                      onClick={() => onSelect?.(leaf.id)}
                    />
                  ))}
                </Dropdown1stLvl>
              );
            }

            // Grouped layout (default) — children are 2nd-lvl rows.
            return (
              <Dropdown1stLvl
                key={item.id}
                label={item.label}
                open={isOpen}
                firstChild={itemIdx === 0}
                onClick={() => toggle(item.id)}
              >
                {item.children?.map((child, childIdx) => {
                  const isChildOpen = openIds.has(child.id);
                  return (
                    <Dropdown2ndLvl
                      key={child.id}
                      label={child.label}
                      open={isChildOpen}
                      firstChild={childIdx === 0}
                      onClick={() => toggle(child.id)}
                    >
                      {child.children.map((leaf) => (
                        <Dropdown3rdLvl
                          key={leaf.id}
                          label={leaf.label}
                          state={leafState(leaf.id)}
                          onClick={() => onSelect?.(leaf.id)}
                        />
                      ))}
                    </Dropdown2ndLvl>
                  );
                })}
              </Dropdown1stLvl>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
