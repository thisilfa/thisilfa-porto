# Contributing

One piece of work is one issue, one branch and one pull request. All three
use the same title, so the issue list, the PR list and `git log` read the
same way.

```
issue   #7  content(projects): write the SIMS case study in both languages
branch       content/7-sims-case-study
commits      content(projects): add SIMS case study in English and Indonesian …
             Refs #7
PR           content(projects): write the SIMS case study in both languages
             Closes #7
```

## 1. Issue first

Open the issue before the branch. It records why the work exists, which the
diff cannot.

- **Title**: `type(scope): summary`, the same format as a commit subject (see
  below). It names the change, not the symptom.
- **Template**: one issue template. It asks for the problem, the scope, and
  what is deliberately left out.
- **One context per issue.** If a reviewer of one part would not need to read
  the other, they are two issues.

This is a solo repository, so there are no project boards, milestones, or
priority/effort fields — the issue's body carries all of that.

## 2. Branch

`<type>/<issue>-<short-slug>`, from an up-to-date `main`:

```
feat/4-design-tokens
content/7-sims-case-study
fix/12-sitemap-base-path
```

## 3. Commits

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

```
type(scope): imperative summary, lower case, no full stop

Why the change was needed, then what it does. Wrap at 72 columns.

Refs #7
```

**Types**

| Type | For |
|---|---|
| `feat` | New behaviour a visitor can see |
| `content` | Site content only: case studies, compact entries, page copy (repo-local type) |
| `fix` | Wrong behaviour made right |
| `refactor` | Restructure with no change in behaviour |
| `style` | Visual polish with no change in behaviour |
| `test` | Tests only |
| `docs` | Documentation, plans, reviews, decision records |
| `ci` | Workflows and repository automation |
| `build` | Build config, dependencies, the toolchain |
| `chore` | Anything else that ships nothing |

**Scopes.** The area labels double as commit scopes: `site`, `content`,
`docs`, `deps`, `ci`. Feature areas narrow further when useful: `i18n`,
`design`, `projects`, `resume`, `home`. Two at once: `fix(i18n,site): …`.
Leave the scope out only when nothing narrower is true.

**Footers**

- Every commit names its issue: `Refs #N`.

## 4. Pull request

- **Base**: `main`. Nothing reaches it except through a PR.
- **Title**: the issue's title.
- **Body**: the template — Problem, What changes, Verification, `Closes #N`,
  plus the content-honesty checklist when the change touches site content.
- **Before opening**: `npm run check` and `npm run build && npm run test:build`
  pass locally.
- **CI** (`.github/workflows/ci.yml`) runs the same checks on every PR into
  `main` and on `main` after each merge — and checks every commit of the PR on
  its own, because rebase merge lands each commit on `main` as written.
  Merge only when it is green.
- **Merge**: rebase and merge, so every commit lands on `main` as written.
  Squash and merge is only for a single-purpose PR whose commits could not be
  cleaned up. Merged branches are deleted.

## 5. Deployment

- A merge to `main` builds and deploys the site to GitHub Pages
  (`.github/workflows/deploy.yml`). There is no staging tier: a personal site
  deploys on merge.
- Rollback is `git revert` plus a merge to `main`.

## 6. Labels

`area: site`, `area: content`, `area: docs`, `area: deps`, `area: ci` — pick
one per issue.

## 7. Content honesty

Site content carries real professional claims. Every content PR checks:

- Every claim traces to a source in `content/` (the reference documents, the
  resume PDF).
- No metric appears unless its definition is verified; resume-only claims
  stay hedged or out.
- No production-readiness claims for work in staging; no delivery claims for
  exploratory research.
- No company data, proprietary logic, internal screenshots, source code, or
  client information.
- Disclosure notes are present on every case study; the ownership label
  (employer / independent / unconfirmed) is present on every entry.

## 8. Bootstrap exception

The first three commits (content baseline, project scaffold, contributor
docs, CI setup) landed on `main` directly — a pull request needs a base
commit to exist, and none existed. From the first CI-enabled change onward,
the spine above applies without exception.
