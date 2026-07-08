import { Source, useOf } from '@storybook/addon-docs/blocks';

type StoryLike = {
  id: string;
  name: string;
  moduleExport: unknown;
};

type MetaResolvedOf = {
  csfFile: { stories: Record<string, StoryLike> };
};

type StoryModuleExport = {
  parameters?: { docs?: { source?: { code?: string } } };
};

export const CodeOnlyDocs = () => {
  const resolvedOf = useOf('meta') as MetaResolvedOf;
  // Self-selecting filter: only stories that opt-in via
  // `parameters.docs.source.code` are shown. Playground / AllVariants stories
  // don't set a manual snippet, so they're hidden from the code-only page.
  const stories = Object.values(resolvedOf.csfFile.stories).filter((story) => {
    const mod = story.moduleExport as StoryModuleExport;
    return Boolean(mod.parameters?.docs?.source?.code);
  });

  // The outer marker element is what preview-head.html's `:has(.code-only-docs)`
  // rules target — they strip the default Storybook Docs padding / max-width so
  // the dark canvas reaches the edges of the preview iframe (which itself
  // resizes with the left sidebar / right panel columns via manager grid CSS).
  return (
    <div className="code-only-docs">
      {stories.map((story) => {
        // Pass the manual snippet string directly via `code` prop — bypasses
        // Storybook's own source-detection heuristics (which sometimes fall
        // back to raw file source, showing the whole story-object literal
        // instead of the resolved template we set).
        const mod = story.moduleExport as StoryModuleExport;
        const code = mod.parameters?.docs?.source?.code ?? '';
        return (
          <section key={story.id} className="code-only-docs__section">
            <h3 className="code-only-docs__title">{story.name}</h3>
            <Source code={code} dark language="tsx" />
          </section>
        );
      })}
    </div>
  );
};
