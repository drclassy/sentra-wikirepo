# Contributing to Sentra Wikirepo

Thanks for improving Sentra Wikirepo. This project is small by design: a static
React app that documents ABYSS architecture, governance, and safe navigation.

## Rules

- Use `pnpm`.
- Keep the app static unless an approved service boundary exists.
- Do not import Sentra crown-jewel implementation paths.
- Do not add PHI, secrets, patient data, local databases, or private runtime
  artifacts.
- Keep documentation honest about clinical validation and regulatory status.

## Local Workflow

```bash
pnpm install
pnpm dev
pnpm verify
```

## Pull Request Checklist

- [ ] `pnpm verify` passes.
- [ ] No `href="#"` placeholders.
- [ ] No root-absolute public asset paths.
- [ ] New viewer entries route through `src/data/wikiDocuments.ts`.
- [ ] No `@sentra/*` runtime imports.
- [ ] No PHI, secrets, or local runtime files.

## Commit Style

Use short conventional commits:

```text
feat(wiki): add governance viewer route
fix(search): preserve query on viewer page
docs(readme): add standalone push instructions
```
