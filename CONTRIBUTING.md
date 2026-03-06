# Contributing to react-edge-sheet

Thank you for your interest in contributing! This document covers everything you need to get started.

---

## Setup

**Requirements:** Node.js ≥ 20, npm ≥ 10

```bash
git clone https://github.com/boraoksuzoglu/react-edge-sheet.git
cd react-edge-sheet
npm install
```

Build the library once to generate `dist/`:

```bash
npm run build
```

---

## Scripts

| Command                 | Description                                   |
| ----------------------- | --------------------------------------------- |
| `npm run build`         | Build ESM + CJS bundles and type declarations |
| `npm run dev`           | Watch mode — rebuilds on file change          |
| `npm run typecheck`     | TypeScript type checking (no emit)            |
| `npm run lint`          | ESLint on `src/` and `website/src/`           |
| `npm run lint:fix`      | ESLint with auto-fix                          |
| `npm run format`        | Prettier format `src/`                        |
| `npm run format:check`  | Check formatting without writing              |
| `npm run test`          | Run tests in watch mode                       |
| `npm run test:run`      | Run tests once (CI mode)                      |
| `npm run test:coverage` | Run tests with V8 coverage report             |
| `npm run size`          | Check bundle size against limits              |

---

## Project Structure

```
src/
├── index.ts              — public exports
├── types.ts              — SheetProps, SheetRef, SheetEdge interfaces
├── utils.ts              — shared constants and pure helpers
├── context/SheetContext.ts
├── hooks/
│   ├── useSheet.ts       — open/close/toggle state machine
│   ├── useSheetDrag.ts   — drag-to-dismiss + snap points
│   ├── useEscapeKey.ts   — Escape key listener
│   ├── useScrollLock.ts  — body scroll lock with stacking counter
│   └── useFocusTrap.ts   — Tab cycling + focus restoration
├── Sheet.tsx             — public component (forwardRef root)
├── SheetContent.tsx      — animated panel
└── SheetBackdrop.tsx     — default backdrop

website/                  — documentation site (Next.js 15 + MDX)
```

---

## Code Conventions

- **No runtime dependencies** — the library ships zero deps beyond React itself. Do not add external packages to `dependencies`.
- **Inline styles only** — no CSS-in-JS, no Tailwind in the library. Users bring their own styles.
- **TypeScript strict** — all exported types must be complete. Avoid `any`; use `unknown` when the type is genuinely unknown.
- **Test new behavior** — any bug fix or new feature should include a test. Run `npm run test:run` before opening a PR.
- **Keep hooks focused** — each hook in `src/hooks/` should do one thing. If you find yourself adding unrelated logic, consider a new file.

---

## Tests

Tests live alongside source files (`*.test.ts` / `*.test.tsx`). The test environment is jsdom via Vitest.

```bash
npm run test:run         # run once
npm run test:coverage    # with coverage report → coverage/
```

When writing tests:

- Pure functions → `describe` / `it` / `expect`, no RTL needed
- Hooks → `renderHook` from `@testing-library/react`
- Components → `render` + `screen` queries, `fireEvent` for interactions

---

## Submitting a Pull Request

1. Fork the repo and create a branch: `git checkout -b feat/my-feature`
2. Make your changes
3. Ensure all checks pass:
   ```bash
   npm run typecheck && npm run lint && npm run format:check && npm run test:run && npm run build
   ```
4. Update `CHANGELOG.md` under `[Unreleased]` with a brief entry
5. Open a PR against `main` — describe what you changed and why

---

## Releasing a New Version

1. Ensure all checks pass on `main`
2. In `CHANGELOG.md`, rename `[Unreleased]` to the new version and date (e.g. `[0.2.0] — 2026-04-01`), then add a fresh `## [Unreleased]` section above it
3. Bump `"version"` in `package.json`
4. Run `npm publish` — `prepublishOnly` will run all checks automatically
5. Tag the release: `git tag v0.x.0 && git push --tags`

The `CHANGELOG.md` at the repo root is the single source of truth — the documentation website reads from it directly at build time.

---

## Reporting Issues

Use [GitHub Issues](https://github.com/boraoksuzoglu/react-edge-sheet/issues). Please include:

- Library version
- Minimal reproduction (CodeSandbox / StackBlitz link preferred)
- Expected vs actual behavior
