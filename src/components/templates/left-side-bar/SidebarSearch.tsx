// React required for classic JSX in Storybook manager bundle (uses Storybook-bundled React 18 via global externals).
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
void React;
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';
import type { SidebarSection } from './types';
import './sidebar-search.css';

export interface SidebarSearchProps {
  sections: SidebarSection[];
  /** Storybook story id of the currently selected leaf — used to highlight the
   *  entry whose target matches (mirrors sidebar's active-row treatment). */
  activeId?: string;
  onSelect: (id: string) => void;
  onClose?: () => void;
}

/** One row shown in search results. We collapse leaves under the same Lvl2
 *  parent (or flat Lvl1) into a single entry — the display path is
 *  `Lvl1 / Lvl2` (or just `Lvl1` for flat sections like Icons). Clicking
 *  navigates to the first leaf of that group. */
interface SearchEntry {
  key: string;
  displayPath: string;
  /** All labels in the ancestry (section / lvl1 / lvl2 / leaves) joined and
   *  lowercased — matched against the query. */
  haystack: string;
  /** Storybook story id used both as navigation target on click and to check
   *  whether this row corresponds to the currently active story. */
  targetStoryId: string;
  /** All leaf ids in this group — used to check active-row state. */
  leafIds: string[];
}

function buildEntries(sections: SidebarSection[]): SearchEntry[] {
  const entries: SearchEntry[] = [];
  for (const section of sections) {
    for (const lvl1 of section.items) {
      if (lvl1.layout === 'flat') {
        if (lvl1.children.length === 0) continue;
        const haystack = [
          section.heading.label,
          lvl1.label,
          ...lvl1.children.map((l) => l.label),
        ]
          .join(' ')
          .toLowerCase();
        entries.push({
          key: lvl1.id,
          displayPath: lvl1.label,
          haystack,
          targetStoryId: lvl1.children[0].id,
          leafIds: lvl1.children.map((l) => l.id),
        });
      } else {
        for (const lvl2 of lvl1.children ?? []) {
          if (lvl2.children.length === 0) continue;
          const haystack = [
            section.heading.label,
            lvl1.label,
            lvl2.label,
            ...lvl2.children.map((l) => l.label),
          ]
            .join(' ')
            .toLowerCase();
          entries.push({
            key: lvl2.id,
            displayPath: `${lvl1.label} / ${lvl2.label}`,
            haystack,
            targetStoryId: lvl2.children[0].id,
            leafIds: lvl2.children.map((l) => l.id),
          });
        }
      }
    }
  }
  return entries;
}

export function SidebarSearch({
  sections,
  activeId,
  onSelect,
  onClose,
}: SidebarSearchProps) {
  const [query, setQuery] = useState('');
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const entries = useMemo(() => buildEntries(sections), [sections]);

  const trimmed = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!trimmed) return [];
    return entries.filter((e) => e.haystack.includes(trimmed));
  }, [entries, trimmed]);

  const showResults = trimmed.length > 0 && results.length > 0;
  const showNoResults = trimmed.length > 0 && results.length === 0;

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose?.();
    }
  };

  return (
    <div className="left-side-bar-search">
      <div className="left-side-bar-search__input">
        <input
          ref={inputRef}
          type="text"
          className="left-side-bar-search__field"
          value={query}
          placeholder="Search on storybook"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          onKeyDown={onKeyDown}
          aria-label="Search stories"
          spellCheck={false}
          autoComplete="off"
        />
      </div>

      {showResults && (
        <ul
          className="left-side-bar-search__results"
          data-hovered={hoveredKey ? '' : undefined}
        >
          {results.map((entry) => {
            const isActive =
              activeId != null && entry.leafIds.includes(activeId);
            return (
              <li key={entry.key} className="left-side-bar-search__row">
                <button
                  type="button"
                  className="left-side-bar-search__row-btn"
                  data-active={isActive ? '' : undefined}
                  onMouseEnter={() => setHoveredKey(entry.key)}
                  onMouseLeave={() =>
                    setHoveredKey((h) => (h === entry.key ? null : h))
                  }
                  onClick={() => onSelect(entry.targetStoryId)}
                >
                  {entry.displayPath}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {showNoResults && (
        <p className="left-side-bar-search__empty">
          No results for &lsquo;{query}&rsquo;
        </p>
      )}
    </div>
  );
}
