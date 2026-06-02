# Deployment

Sentra Wikirepo builds to static files.

```bash
pnpm install
pnpm verify
pnpm build
```

The production output lives in:

```text
dist/
```

## Vercel

| Setting          | Value        |
| ---------------- | ------------ |
| Framework preset | Vite         |
| Install command  | `pnpm install --frozen-lockfile` |
| Build command    | `pnpm build` |
| Output directory | `dist`       |

## Netlify

| Setting          | Value        |
| ---------------- | ------------ |
| Build command    | `pnpm build` |
| Publish directory| `dist`       |

## GitHub Pages

Use a Pages workflow that runs `pnpm build` and uploads `dist/`.

If you deploy under a subpath, update `vite.config.ts` `base` before building.

## Internal Hosting

Serve `dist/` behind internal access control if the content includes private
ABYSS architecture or governance details.
