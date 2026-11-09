# thisilfa-porto

Bilingual personal portfolio for Silfaradila Mei Fizahidah — AI / Computer
Vision engineer. English at `/`, Indonesian at `/id/`, fully static, no
backend. Built with Astro 7, React and TypeScript.

Live at <https://thisilfa.github.io/thisilfa-porto/> once the first deploy
lands (merges to `main` deploy automatically).

## Structure

```text
content/          authoring sources (reference docs, resume PDF, images) — never edited by the build
docs/             brainstorm requirements and implementation plans
src/pages/        English pages (unprefixed default locale)
src/pages/id/     Indonesian mirrors
src/content/      site content collections (projects, both locales)
src/styles/       design tokens and global styles
public/           served as-is: resume PDF, favicon, OG image
```

## Development

Requires Node ≥ 22.23.

```bash
npm install       # install dependencies
npm run dev       # dev server at localhost:4321/thisilfa-porto/
npm run check     # lint + format + typecheck + unit tests
npm run build     # production build to dist/
npm run test:build  # smoke checks over dist/ (base path, sitemap)
npm run preview   # serve the production build locally
```

`npm run check` is what CI runs, plus the build chain. All of it must pass
before opening a PR — see [CONTRIBUTING.md](CONTRIBUTING.md) for the full
workflow (one issue = one branch = one PR, Conventional Commits, rebase
merge).

## Deployment

Merges to `main` build and deploy via GitHub Actions
(`.github/workflows/deploy.yml`) to the `github-pages` environment.

One-time repo setting (already required before the first deploy works):
**Settings → Pages → Source: GitHub Actions.**

## Bilingual model

English is the default locale and lives at unprefixed paths
(`/about/`); Indonesian mirrors live under `/id/` (`/id/about/`). Every
page exists in both languages — the build fails if a translation is
missing. Language switching maps between locale equivalents of the same
page.
