// React required for classic JSX in Storybook manager bundle (uses Storybook-bundled React 18 via global externals).
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
void React; // satisfy noUnusedLocals — React is used at runtime by classic JSX transform
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { addons } from 'storybook/manager-api';
import type { API } from 'storybook/manager-api';
import { LeftSideBar } from '../src/components/templates/left-side-bar/LeftSideBar';
import { buildSidebarFromIndex, type StoryIndex } from '../src/components/templates/left-side-bar/build-sidebar';
import { HIDDEN_TITLE_PREFIXES, SECTION_CONFIGS } from '../src/components/templates/left-side-bar/section-config';
import { RightSidePanel } from '../src/components/templates/right-side-panel/RightSidePanel';
import { IconOnlyButton } from '../src/components/templates/right-side-panel/IconOnlyButton';
import {
  FilterIcon,
  PlusIcon,
  MinusIcon,
} from '../src/components/templates/right-side-panel/internal-icons';
import { SidebarClosedIcon } from '../src/components/templates/left-side-bar/internal-icons';
import {
  buildControlsFromArgTypes,
  type ArgTypesLike,
} from '../src/components/templates/right-side-panel/build-controls';

// Hide Storybook's native bottom addon panel — our RightSidePanel replaces it.
addons.setConfig({
  layoutCustomisations: {
    showPanel: () => false,
  },
});

/**
 * Phase 2.1 — mounts the custom `LeftSideBar` into Storybook's actual sidebar slot
 * (`#storybook-sidebar-region`), replacing the default story tree visually.
 * Reads stories from the live `api.getIndex()` and navigates via `api.selectStory()`.
 */

const LSB_CLOSED_STORAGE_KEY = 'left-side-bar:closed';

function readClosedFromStorage(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(LSB_CLOSED_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function SidebarApp({ api }: { api: API }) {
  const [index, setIndex] = useState<StoryIndex | undefined>(
    () => api.getIndex() as StoryIndex | undefined,
  );
  const [activeId, setActiveId] = useState<string | undefined>(
    () => api.getCurrentStoryData()?.id,
  );
  // Persisted via localStorage — survives reloads and new tabs (sidebar
  // visibility is a global user preference, like in Figma / VS Code).
  const [closed, setClosed] = useState<boolean>(() => readClosedFromStorage());

  // Reflect on <body> so the Storybook layout (nav-width) and the floating
  // re-open trigger (portalled below) can react via CSS.
  useEffect(() => {
    if (closed) {
      document.body.setAttribute('data-lsb-closed', '');
    } else {
      document.body.removeAttribute('data-lsb-closed');
    }
    try {
      window.localStorage.setItem(LSB_CLOSED_STORAGE_KEY, closed ? '1' : '0');
    } catch {
      /* ignore quota / privacy-mode errors */
    }
    return () => document.body.removeAttribute('data-lsb-closed');
  }, [closed]);

  // Welcome story always greets the user with the sidebar open — its whole
  // point is to introduce the nav, so a collapsed sidebar there is useless.
  // Persistence still applies on every other story.
  useEffect(() => {
    if (activeId === '0welcome--blank') {
      setClosed(false);
    }
  }, [activeId]);

  useEffect(() => {
    const refreshIndex = () => {
      const idx = api.getIndex() as StoryIndex | undefined;
      if (idx) setIndex(idx);
    };

    // Resolve the new story id from the event payload first (which carries the FRESH
    // value), then fall back to `api.getCurrentStoryData()` for events without payload
    // and for the initial mount.
    const refreshActive = (payload?: unknown) => {
      let id: string | undefined;
      if (typeof payload === 'string') id = payload;
      else if (payload && typeof payload === 'object' && 'storyId' in payload) {
        id = (payload as { storyId?: string }).storyId;
      } else if (payload && typeof payload === 'object' && 'id' in payload) {
        id = (payload as { id?: string }).id;
      }
      setActiveId(id ?? api.getCurrentStoryData()?.id);
    };

    refreshIndex();
    refreshActive();

    api.on('STORY_INDEX_INVALIDATED', refreshIndex);
    api.on('SET_INDEX', refreshIndex);
    api.on('CURRENT_STORY_WAS_SET', refreshActive);
    api.on('STORY_CHANGED', refreshActive);
    api.on('STORY_PREPARED', refreshActive);
    api.on('STORY_RENDERED', refreshActive);

    // Brute-force poll — `api.on(...)` events are unreliable in v10 across all
    // navigation flows (URL hashchange, F5, sidebar click, browser back/forward).
    // 200ms polling of `getCurrentStoryData()` is imperceptible and bulletproof.
    // Uses a functional state update so we don't re-render when value hasn't changed.
    const poll = setInterval(() => {
      const idx = api.getIndex();
      if (idx) {
        setIndex((prev) => (prev === idx ? prev : (idx as StoryIndex)));
      }
      const cur = api.getCurrentStoryData()?.id;
      setActiveId((prev) => (prev === cur ? prev : cur));
    }, 200);

    return () => {
      api.off('STORY_INDEX_INVALIDATED', refreshIndex);
      api.off('SET_INDEX', refreshIndex);
      api.off('CURRENT_STORY_WAS_SET', refreshActive);
      api.off('STORY_CHANGED', refreshActive);
      api.off('STORY_PREPARED', refreshActive);
      api.off('STORY_RENDERED', refreshActive);
      clearInterval(poll);
    };
  }, [api]);

  // Memoize FIRST (Rules of Hooks: hooks must run in the same order every render).
  // Early returns below must NOT precede any hook call.
  const sections = useMemo(
    () =>
      index
        ? buildSidebarFromIndex(index, SECTION_CONFIGS, HIDDEN_TITLE_PREFIXES)
        : [],
    [index],
  );

  if (!index) {
    return (
      <div style={{ padding: 16, fontFamily: 'sans-serif', color: '#888' }}>
        Loading stories…
      </div>
    );
  }

  return (
    <>
      <LeftSideBar
        sections={sections}
        activeId={activeId}
        onSelect={(id) => api.selectStory(id)}
        onLogoClick={() => api.selectStory('0welcome--blank')}
        storageKey="left-side-bar:open-ids"
        onCollapse={() => setClosed(true)}
      />
      {createPortal(
        <button
          type="button"
          className="lsb-reopen rsp-icon-only-button rsp-icon-only-button--floating"
          data-visible={closed ? '' : undefined}
          aria-label="Open sidebar"
          aria-hidden={!closed}
          tabIndex={closed ? 0 : -1}
          onClick={() => setClosed(false)}
        >
          <span className="rsp-icon-only-button__icon" aria-hidden="true">
            <SidebarClosedIcon />
          </span>
        </button>,
        document.body,
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// RightSidePanel — replaces Storybook's bottom addon panel.
// Auto-opens on story select; user-closable; hidden on Docs / no-arg stories.
// ---------------------------------------------------------------------------

interface StoryDataLike {
  id: string;
  type?: string;
  args?: Record<string, unknown>;
  initialArgs?: Record<string, unknown>;
  argTypes?: ArgTypesLike;
}

/** Take a fresh snapshot of the current entry. Storybook v10 mutates the leaf
 *  entry in place (e.g. `prepared` flips true and `argTypes` arrive later), so
 *  a reference-equality comparison would miss those mutations and React would
 *  never re-render. We force a new top-level object each poll. */
/** Canvas zoom — bypasses Storybook's private ZoomContext (no public API to
 *  set it from outside, and synthetic keydown events are ignored by SB's
 *  shortcut handler because they're untrusted). We instead inject a
 *  stylesheet that targets the iframe-wrapper with `!important` rules,
 *  mirroring the inline-style transform Storybook itself would write.
 *
 *  Selector `div:has(> #storybook-preview-iframe)` picks the immediate
 *  parent of the preview iframe — the same element Storybook scales
 *  internally. Modern browsers (Chrome 105+, FF 121+, Safari 15.4+) all
 *  support `:has`, which matches Storybook v10's target matrix. */
const ZOOM_LEVELS = [0.25, 0.5, 0.75, 0.9, 1, 1.1, 1.25, 1.5, 2, 3, 4, 8];
const ZOOM_DEFAULT_IDX = ZOOM_LEVELS.indexOf(1);
let zoomIdx = ZOOM_DEFAULT_IDX;
let zoomStyleEl: HTMLStyleElement | null = null;

function applyZoom(): void {
  if (!zoomStyleEl) {
    zoomStyleEl = document.createElement('style');
    zoomStyleEl.id = '_rsp-zoom-override';
    document.head.appendChild(zoomStyleEl);
  }
  const scale = ZOOM_LEVELS[zoomIdx];
  if (scale === 1) {
    zoomStyleEl.textContent = '';
    return;
  }
  const dim = (100 / scale).toFixed(4);
  zoomStyleEl.textContent = `
    div:has(> #storybook-preview-iframe) {
      transform: scale(${scale}) !important;
      transform-origin: top left !important;
      width: ${dim}% !important;
      height: ${dim}% !important;
    }
  `;
}

function dispatchZoomShortcut(direction: 'in' | 'out' | 'reset'): void {
  if (direction === 'reset') {
    zoomIdx = ZOOM_DEFAULT_IDX;
  } else if (direction === 'in') {
    zoomIdx = Math.min(zoomIdx + 1, ZOOM_LEVELS.length - 1);
  } else {
    zoomIdx = Math.max(zoomIdx - 1, 0);
  }
  applyZoom();
}

function snapshotStory(api: API): StoryDataLike | undefined {
  const data = api.getCurrentStoryData() as StoryDataLike | undefined;
  if (!data) return undefined;
  return {
    id: data.id,
    type: data.type,
    args: data.args ? { ...data.args } : undefined,
    argTypes: data.argTypes,
    initialArgs: data.initialArgs ? { ...data.initialArgs } : undefined,
  };
}

function RightPanelApp({ api }: { api: API }) {
  const [storyData, setStoryData] = useState<StoryDataLike | undefined>(
    () => snapshotStory(api),
  );
  // Start closed — per spec the panel must NOT auto-open from a URL restore on
  // reload. It opens only when the user actively navigates to a story.
  const [closedByUser, setClosedByUser] = useState(true);
  // Optimistic overlay for in-flight (mid-debounce) text/number values — keeps
  // the input visually responsive while we wait to commit to Storybook.
  const [pending, setPending] = useState<Record<string, unknown>>({});

  // Refresh source-of-truth on every relevant Storybook event + 200ms polling
  // (same brute-force pattern as SidebarApp — v10 events are unreliable across
  // all navigation flows).
  useEffect(() => {
    const refresh = () => {
      setStoryData(snapshotStory(api));
    };

    refresh();

    api.on('STORY_CHANGED', refresh);
    api.on('STORY_PREPARED', refresh);
    api.on('STORY_RENDERED', refresh);
    api.on('STORY_ARGS_UPDATED', refresh);
    api.on('CURRENT_STORY_WAS_SET', refresh);

    const poll = setInterval(refresh, 200);

    return () => {
      api.off('STORY_CHANGED', refresh);
      api.off('STORY_PREPARED', refresh);
      api.off('STORY_RENDERED', refresh);
      api.off('STORY_ARGS_UPDATED', refresh);
      api.off('CURRENT_STORY_WAS_SET', refresh);
      clearInterval(poll);
    };
  }, [api]);

  // Auto-open behaviour: the panel must NOT open from a URL restore on reload,
  // only on actual navigation. We remember the first real story-ID we see and
  // ignore it; any subsequent story-ID change is treated as a deliberate user
  // navigation and re-opens the panel.
  const storyId = storyData?.id;
  const lastSeenStoryIdRef = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!storyId) return;
    if (lastSeenStoryIdRef.current === undefined) {
      // First real story we observe — page load / URL restore. Stay closed.
      lastSeenStoryIdRef.current = storyId;
      setPending({});
      return;
    }
    if (lastSeenStoryIdRef.current !== storyId) {
      lastSeenStoryIdRef.current = storyId;
      setClosedByUser(false);
      setPending({});
    }
  }, [storyId]);

  // Once Storybook confirms a debounced commit, drop the matching pending entry
  // so future external changes (e.g. another addon mutating args) flow through.
  const args = storyData?.args ?? {};
  useEffect(() => {
    setPending((prev) => {
      const next: Record<string, unknown> = {};
      let changed = false;
      for (const key of Object.keys(prev)) {
        if (args[key] === prev[key]) {
          changed = true;
          continue;
        }
        next[key] = prev[key];
      }
      return changed ? next : prev;
    });
  }, [args]);

  // Debounce timer for text/number inputs.
  const debounceRef = useRef<number | undefined>(undefined);
  const storyDataRef = useRef<StoryDataLike | undefined>(storyData);
  storyDataRef.current = storyData;

  // Cancel any pending debounce on story switch so the commit doesn't land on
  // the next story by mistake.
  useEffect(() => {
    return () => {
      if (debounceRef.current !== undefined) {
        window.clearTimeout(debounceRef.current);
        debounceRef.current = undefined;
      }
    };
  }, [storyId]);

  // Compute controls + display args (= committed args overlaid with pending).
  const argTypes = storyData?.argTypes;
  const displayArgs = useMemo(() => ({ ...args, ...pending }), [args, pending]);
  const controls = useMemo(
    () => buildControlsFromArgTypes(argTypes, displayArgs),
    [argTypes, displayArgs],
  );

  // The panel itself shows when the active entry is a real Story with at least
  // one supported control and the user hasn't manually dismissed it.
  const canShowPanel =
    !!storyData && storyData.type === 'story' && controls.length > 0;
  const shouldShow = canShowPanel && !closedByUser;
  // The gear re-open button appears in the same conditions, minus the dismissal:
  // it lets the user summon the panel back without navigating away.
  const showGearButton = canShowPanel && closedByUser;

  // Reflect open/closed state on the body so the canvas can be padded around
  // the floating panel via CSS.
  useEffect(() => {
    if (shouldShow) {
      document.body.setAttribute('data-rsp-open', '');
    } else {
      document.body.removeAttribute('data-rsp-open');
    }
    return () => document.body.removeAttribute('data-rsp-open');
  }, [shouldShow]);

  if (!storyData) return null;

  // Closed but available — render the floating controls strip in the bottom-
  // right of the viewport. Layout (left → right): [+] [−] [⚙]. All three are
  // identical 40×40 borderless circles on white. Portalled to `document.body`
  // so the buttons escape the mount div's `transform: translateX(100%)` (a
  // transformed ancestor would turn `position: fixed` into "fixed relative
  // to ancestor", pushing them off-screen along with the closed panel).
  if (showGearButton) {
    return createPortal(
      <div
        style={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 11,
          display: 'flex',
          gap: 8,
        }}
      >
        <IconOnlyButton
          className="rsp-icon-only-button--floating"
          icon={<PlusIcon size={17.5} />}
          ariaLabel="Zoom in"
          onClick={() => dispatchZoomShortcut('in')}
        />
        <IconOnlyButton
          className="rsp-icon-only-button--floating"
          icon={<MinusIcon size={17.5} />}
          ariaLabel="Zoom out"
          onClick={() => dispatchZoomShortcut('out')}
        />
        <IconOnlyButton
          className="rsp-icon-only-button--floating"
          icon={<FilterIcon />}
          ariaLabel="Show controls"
          onClick={() => setClosedByUser(false)}
        />
      </div>,
      document.body,
    );
  }

  if (!shouldShow) return null;

  const handleUpdate = (name: string, value: unknown) => {
    const control = controls.find((c) => c.name === name);
    if (control?.kind === 'input') {
      // Text/number — apply optimistic overlay immediately, debounce commit.
      setPending((prev) => ({ ...prev, [name]: value }));
      if (debounceRef.current !== undefined) {
        window.clearTimeout(debounceRef.current);
      }
      debounceRef.current = window.setTimeout(() => {
        const current = storyDataRef.current;
        if (!current) return;
        api.updateStoryArgs(current as never, { [name]: value });
        debounceRef.current = undefined;
      }, 250);
      return;
    }
    // Toggle / select — commit immediately.
    api.updateStoryArgs(storyData as never, { [name]: value });
  };

  const handleReset = () => {
    setPending({});
    if (debounceRef.current !== undefined) {
      window.clearTimeout(debounceRef.current);
      debounceRef.current = undefined;
    }
    api.resetStoryArgs(storyData as never);
  };

  const handleClose = () => setClosedByUser(true);

  return (
    <RightSidePanel
      controls={controls}
      args={displayArgs}
      initialArgs={storyData.initialArgs ?? {}}
      onUpdate={handleUpdate}
      onReset={handleReset}
      onClose={handleClose}
    />
  );
}

addons.register('right-side-panel-custom', (api) => {
  let mount = document.getElementById('custom-right-panel-mount');
  if (!mount) {
    mount = document.createElement('div');
    mount.id = 'custom-right-panel-mount';
    document.body.appendChild(mount);
  }
  const root = createRoot(mount);
  root.render(<RightPanelApp api={api} />);

  // Force-land on the blank welcome story on every new tab session. Storybook
  // v10 otherwise auto-picks the alphabetically-first Docs entry (e.g. BadgeGroup),
  // which we don't want as the default canvas.
  // Refreshing within the same tab preserves the last selection (sessionStorage
  // flag survives refresh but is wiped when the tab closes).
  if (typeof sessionStorage !== 'undefined' && !sessionStorage.getItem('rsp-initial-welcomed')) {
    sessionStorage.setItem('rsp-initial-welcomed', '1');
    // Defer one tick so Storybook's router is ready to accept selectStory.
    setTimeout(() => {
      try {
        api.selectStory('0welcome--blank');
      } catch {
        /* ignore — welcome story may not be in this index */
      }
    }, 50);
  }
});

addons.register('left-side-bar-custom', (api) => {
  // Mount React into a fresh div appended directly to <body> — mirrors
  // `right-side-panel-custom` so the floating sidebar is positioned relative
  // to the viewport, not relative to Storybook's grid-driven sidebar slot.
  // (When `--nav-width` snaps to 0, the slot's containing block collapses, and
  // a `position: fixed` child inside it can desync from the viewport mid-
  // animation if any ancestor establishes a transformed containing block.)
  //
  // We still flag `#storybook-sidebar-region` with `data-custom-sidebar` so
  // CSS hides Storybook's default sidebar tree.
  const tryMount = (attempt = 0) => {
    const region = document.getElementById('storybook-sidebar-region');
    if (!region) {
      if (attempt < 100) setTimeout(() => tryMount(attempt + 1), 50);
      return;
    }
    region.setAttribute('data-custom-sidebar', '');

    let mount = document.getElementById('custom-sidebar-mount');
    if (!mount) {
      mount = document.createElement('div');
      mount.id = 'custom-sidebar-mount';
      document.body.appendChild(mount);
    }

    const root = createRoot(mount);
    root.render(<SidebarApp api={api} />);
  };

  tryMount();
});
