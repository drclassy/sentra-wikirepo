# Testing

Run the full gate:

```bash
pnpm verify
```

## Checks

| Command          | Purpose                              |
| ---------------- | ------------------------------------ |
| `pnpm lint`      | ESLint and React Hooks rules         |
| `pnpm typecheck` | TypeScript project references        |
| `pnpm test`      | App-local link verification          |
| `pnpm build`     | Production Vite build                |

## Link Verification

`scripts/verify-links.mjs` blocks:

- placeholder `href="#"`
- root-absolute public image paths
- inert click handlers that only call `preventDefault`

## Manual Browser QA

Check these flows before release:

1. Home page renders with the ABYSS article.
2. `View Source` opens the AGENTS governance viewer route.
3. Search for `governance` opens `/viewer/search?q=governance`.
4. Article tabs update selected state.
5. Theme toggle changes light/dark class.
6. Mobile drawer opens and closes.
7. No browser console errors appear.
