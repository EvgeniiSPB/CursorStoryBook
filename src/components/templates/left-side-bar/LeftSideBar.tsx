// React required for classic JSX in Storybook manager bundle (uses Storybook-bundled React 18 via global externals).
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
void React; // satisfy noUnusedLocals — React is used at runtime by classic JSX transform
import { useEffect, useMemo, useState, type HTMLAttributes } from 'react';
import { DropdownHeading } from './DropdownHeading';
import { Dropdown1stLvl } from './Dropdown1stLvl';
import { Dropdown2ndLvl } from './Dropdown2ndLvl';
import { Dropdown3rdLvl } from './Dropdown3rdLvl';
import { Logo } from './Logo';
import { SidebarSearch } from './SidebarSearch';
import type { SidebarSection } from './types';
import './left-side-bar.css';

export interface LeftSideBarProps
  extends Omit<HTMLAttributes<HTMLElement>, 'onSelect' | 'children'> {
  sections: SidebarSection[];
  /** Storybook story id of the currently selected leaf. */
  activeId?: string;
  /** Fired when user clicks a 3rd-lvl leaf row. */
  onSelect?: (id: string) => void;
  /** Item ids (1st or 2nd lvl) that should be open on first render.
   *  Seeds `openManual` — the auto-lock rule doesn't fire until the user
   *  clicks a 1st-lvl group, at which point the "one explorer" invariant
   *  kicks in (any additional non-active 1st-lvl ids collapse). */
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
  /** When provided, renders a collapse-sidebar icon-only button at the right
   *  edge of the logo plate (Figma 6567:40878). The host owns the open/closed
   *  state and the slide-out animation. */
  onCollapse?: () => void;
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
  onCollapse,
  className,
  ...rest
}: LeftSideBarProps) {
  // Enumerate 1st-level ids from the tree — needed to distinguish 1st-lvl
  // (subject to the "auto-lock active + one explorer" rule) from 2nd-lvl
  // (free-form toggle inside its 1st-lvl parent).
  const firstLvlIds = useMemo(() => {
    const set = new Set<string>();
    for (const section of sections) {
      for (const item of section.items) set.add(item.id);
    }
    return set;
  }, [sections]);

  // Active-branch path is derived every render from `activeId` — that's the
  // single source of truth for "which branch am I in". Auto-lock rule:
  //   effective open = activePath (auto)  ∪  openManual (user's explicit set)
  // constrained by: `openManual` may hold at most one 1st-lvl id — the one
  // "explorer" branch the user is peeking into. Toggle logic enforces this.
  const activePath = useMemo(
    () => (activeId ? findPathToLeaf(sections, activeId) : []),
    [sections, activeId],
  );
  const activePathSet = useMemo(() => new Set(activePath), [activePath]);
  const activePath1st = activePath[0] ?? null;

  const [openManual, setOpenManual] = useState<Set<string>>(() => {
    const seed = new Set<string>(defaultOpenItemIds);
    readPersistedIds(storageKey).forEach((id) => seed.add(id));
    // Enforce the "at most one 1st-lvl id" invariant on the seed. Stale
    // sessionStorage from the pre-auto-lock era (or over-eager
    // defaultOpenItemIds) can carry several — keep only the last one so
    // rendering doesn't unpin a bunch of branches on first mount. Insertion
    // order is preserved, so "last" = most recently added.
    const initial = new Set<string>();
    let last1st: string | null = null;
    for (const id of seed) {
      if (firstLvlIds.has(id)) {
        last1st = id;
      } else {
        initial.add(id);
      }
    }
    if (last1st) initial.add(last1st);
    return initial;
  });

  const [searchOpen, setSearchOpen] = useState(false);

  // Persist on every change to sessionStorage (per-tab scope). We store the
  // user-explicit set only; `activePath` is re-derived from the URL on load.
  useEffect(() => {
    if (!storageKey || typeof window === 'undefined') return;
    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify([...openManual]));
    } catch {
      /* ignore quota / privacy-mode errors */
    }
  }, [openManual, storageKey]);

  // Derive the single exploratory 1st-lvl id from `openManual`. This is the
  // ONLY 1st-lvl id (non-active) that renders as open — any drift in
  // `openManual` (multiple 1st-lvl ids from stale storage / HMR / aggressive
  // defaults) is silently ignored at the render layer. We pick the LAST
  // matching id in insertion order = most recently added.
  const explorer1st = useMemo(() => {
    let last: string | null = null;
    for (const id of openManual) {
      if (firstLvlIds.has(id) && !activePathSet.has(id)) last = id;
    }
    return last;
  }, [openManual, firstLvlIds, activePathSet]);

  const toggle = (id: string) => {
    const isFirstLvl = firstLvlIds.has(id);
    // Active-branch 1st-lvl is locked open (its whole point is anchoring
    // the user's current location) — click is a no-op.
    if (isFirstLvl && id === activePath1st) return;
    setOpenManual((prev) => {
      if (isFirstLvl) {
        // Decision based on VISUAL state (explorer1st), not raw openManual —
        // avoids the "clicking a visibly-closed group closes it further"
        // bug when `openManual` has drift.
        const isCurrentlyOpen = id === explorer1st;
        const next = new Set<string>();
        // Reset all 1st-lvl slots (drops the previous explorer + any stale
        // 1st-lvl entries). 2nd-lvl toggles survive so their expanded state
        // is preserved when re-opening their parent later.
        prev.forEach((existing) => {
          if (!firstLvlIds.has(existing)) next.add(existing);
        });
        if (!isCurrentlyOpen) next.add(id);
        return next;
      }
      // 2nd-lvl — free-form toggle within its parent 1st-lvl.
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isOpen = (id: string) => {
    if (activePathSet.has(id)) return true;
    if (firstLvlIds.has(id)) return id === explorer1st;
    return openManual.has(id);
  };

  const classes = [
    'left-side-bar',
    searchOpen ? 'left-side-bar--search-open' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={classes} aria-label="Sidebar navigation" {...rest}>
      <Logo
        onClick={onLogoClick}
        onCollapse={onCollapse}
        onSearch={() => setSearchOpen((v) => !v)}
        searchOpen={searchOpen}
      />
      {searchOpen ? (
        <SidebarSearch
          sections={sections}
          activeId={activeId}
          onSelect={(id) => {
            onSelect?.(id);
            setSearchOpen(false);
          }}
          onClose={() => setSearchOpen(false)}
        />
      ) : (
        sections.map((section) => (
        <div className="left-side-bar__section" key={section.id}>
          <DropdownHeading
            label={section.heading.label}
            count={section.heading.count}
            badge={section.heading.badge ?? 'metallic'}
          />
          {section.items.map((item, itemIdx) => {
            const isItemOpen = isOpen(item.id);

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
                  open={isItemOpen}
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
                open={isItemOpen}
                firstChild={itemIdx === 0}
                onClick={() => toggle(item.id)}
              >
                {item.children?.map((child, childIdx) => {
                  const isChildOpen = isOpen(child.id);
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
        ))
      )}
    </nav>
  );
}
