import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  "framework": "@storybook/react-vite",
  "features": {
    "sidebarOnboardingChecklist": false
  },
  // Storybook 10 + Vite 8 / Rolldown bug: addon-docs's DocsRenderer performs
  // `await import("@mdx-js/react")`, but Rolldown emits it as `import(null)`
  // in the prod bundle. Every Docs page then dies at the loading skeleton
  // because the renderer never mounts. Statically inline the module so the
  // dynamic form is never emitted.
  async viteFinal(config) {
    config.plugins ??= [];
    config.plugins.push({
      name: 'fix-mdx-dynamic-import',
      enforce: 'pre',
      transform(code, id) {
        if (!id.includes('addon-docs/dist/_browser-chunks/chunk-OATZR77O')) return null;
        if (!code.includes('import("@mdx-js/react")')) return null;
        const patched = code
          .replace(
            /^/,
            'import * as __mdxReact from "@mdx-js/react";\n',
          )
          .replace(
            /import\("@mdx-js\/react"\)/g,
            'Promise.resolve(__mdxReact)',
          );
        return { code: patched, map: null };
      },
    });
    return config;
  },
};
export default config;
