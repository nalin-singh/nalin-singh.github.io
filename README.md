# nalin-singh.github.io

Nalin Singh's portfolio and writing, live at [nalin-singh.github.io](https://nalin-singh.github.io). Built with [Astro](https://astro.build) as a static site on GitHub Pages.

## Run it

Needs Node 22.23.4 or newer (see `.nvmrc`) and pnpm 10.

```bash
pnpm install
```

```bash
pnpm dev
```

The site runs at http://localhost:4321.

## Scripts

| Script         | What it does                                          |
| -------------- | ----------------------------------------------------- |
| `pnpm dev`     | Starts the dev server                                 |
| `pnpm build`   | Type-checks, then builds the static site into `dist/` |
| `pnpm preview` | Serves the built site                                 |
| `pnpm verify`  | Format check, lint and type check, the same as CI     |
| `pnpm fmt`     | Formats everything with oxfmt                         |
| `pnpm lint`    | Lints with oxlint                                     |

Git hooks (lefthook) check formatting and lint on commit, and types on push.

## Layout

```
src/
  components/   chrome (bar, footer), home sections, blueprints, writes, ui
  content/      writes, as Markdown or MDX
  data/         copy and content for the home page
  layouts/      the base sheet and the post layout
  lib/          collection helpers, the code block frame and the baked roughness
  pages/        routes: home, writes, RSS feed, 404
  scripts/      typed interaction modules, one per behaviour
  styles/       tokens, then one stylesheet per component
public/         textures and the favicon (fonts load from Google Fonts)
docs/           design system, writing guide, performance rules
```

## Conventions

- File names in kebab-case, variables in camelCase, single words where they read well.
- Named exports only.
- Conventional commits: `feat`, `fix`, `perf`, `refactor`, `style`, `chore`, `ci`, `docs`.

## Docs

- [Design system](docs/design-system.md): colour, type, texture, components and motion.
- [Writing a post](docs/writing.md): front matter and the MDX components.
- [Performance](docs/performance.md): the paint rules that keep scrolling smooth.

## Deploy

Every push to `main` builds and deploys through `.github/workflows/deploy.yml`. In the repository settings, Pages must use **GitHub Actions** as its source.
