// React required for classic JSX in Storybook manager bundle (uses Storybook-bundled React 18 via global externals).
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
void React; // satisfy noUnusedLocals — React is used at runtime by classic JSX transform
import { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { addons } from 'storybook/manager-api';
import type { API } from 'storybook/manager-api';
import { LeftSideBar } from '../src/components/templates/left-side-bar/LeftSideBar';
import { buildSidebarFromIndex, type StoryIndex } from '../src/components/templates/left-side-bar/build-sidebar';
import { SECTION_CONFIGS } from '../src/components/templates/left-side-bar/section-config';

/**
 * Phase 2.1 — mounts the custom `LeftSideBar` into Storybook's actual sidebar slot
 * (`#storybook-sidebar-region`), replacing the default story tree visually.
 * Reads stories from the live `api.getIndex()` and navigates via `api.selectStory()`.
 */

function SidebarApp({ api }: { api: API }) {
  const [index, setIndex] = useState<StoryIndex | undefined>(
    () => api.getIndex() as StoryIndex | undefined,
  );
  const [activeId, setActiveId] = useState<string | undefined>(
    () => api.getCurrentStoryData()?.id,
  );

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
    () => (index ? buildSidebarFromIndex(index, SECTION_CONFIGS) : []),
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
    <LeftSideBar
      sections={sections}
      activeId={activeId}
      onSelect={(id) => api.selectStory(id)}
      storageKey="left-side-bar:open-ids"
    />
  );
}

addons.register('left-side-bar-custom', (api) => {
  // Mount React into the manager's existing sidebar slot once the DOM is ready.
  // Poll briefly because the manager renders asynchronously — region may not exist yet.
  const tryMount = (attempt = 0) => {
    const region = document.getElementById('storybook-sidebar-region');
    if (!region) {
      if (attempt < 100) setTimeout(() => tryMount(attempt + 1), 50);
      return;
    }

    // Mark host for CSS — hides Storybook's default children, keeps our mount visible.
    region.setAttribute('data-custom-sidebar', '');

    let mount = region.querySelector<HTMLElement>(':scope > #custom-sidebar-mount');
    if (!mount) {
      mount = document.createElement('div');
      mount.id = 'custom-sidebar-mount';
      region.appendChild(mount);
    }

    const root = createRoot(mount);
    root.render(<SidebarApp api={api} />);
  };

  tryMount();
});
