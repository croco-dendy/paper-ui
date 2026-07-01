# Plan 010 — Design System Phase 2: Consistency & Component Gaps

**Status:** 🚧 In Progress
**Created:** 2026-07-01
**Scope:** Token rationalization, interaction-state consistency, filling missing components, texture/visual quality pass — all under the explicit goal of keeping every new piece on the "paper, ink, canvas, watercolor" aesthetic.

---

## Context

Repo infra (org transfer, release-please, commitlint, Vercel deploy of the showcase to `ui.adoo.one`) is done and stable. Focus shifted to the design system itself: making tokens consistent, auditing interaction states, and closing component gaps one batch at a time.

**Working agreement (still active):** minimal testing overhead. Verify with `check-types` / `lint` / `build` / `build:showcase`, plus a quick visual check if needed. No deep interaction testing — the user reviews visually and reports issues themselves. Push directly to `main` (no PRs) until Paper Camp integration is wired up for this repo.

---

## Completed This Phase

### Tokens & tooling
- `fedba03` — rationalized the font-size scale
- `28e0214` — gave the blue accent a distinct hue (was duplicate of green), added green-dark
- `bdbc4d8` — fixed CI `packageManager` resolution for pnpm/action-setup

### Accessibility / consistency audit
- `47cc215` — added missing hover/focus states across interactive elements
- `0191175` — unified focus rings into two mixins: `focus-ring` (solid, for buttons/clickables) and `ink-focus` (dotted, for text fields) — policy documented in [CODE_STYLE.md](./CODE_STYLE.md) §7

### New components (gap-filling batch)
- `d491056` / `8b7f723` — Radio, RadioGroup, Switch, Spinner, Skeleton
- `ec8e27a` / `2bd50d2` — Badge (status pill, distinct from the decorative Stamp), Divider (fading ink-stroke separator)
- `c108bc2` — reworked Switch and Spinner visuals to match the paper/ink aesthetic (organic-radius thumb, paper-grain track, gradient spinner arc)
- `2487223` / `779e621` — Tooltip (portal-positioned; fixed two real bugs found via browser testing: refs failing silently because paper-ui components aren't `forwardRef`-wrapped, and hover/focus state incorrectly canceling each other)
- `1138225` / `7019835` — Toast notification system (`ToastProvider` + `useToast`, 6-position stacking, pause-on-hover auto-dismiss), built on top of Alert's visuals; Alert kept as the small inline component with `kraft` as its default (container-contrasting) texture

### Texture quality pass
- `2923d41` — canvas texture redesigned (was a mechanical CSS crosshatch, looked wrong and inconsistent vs. every other `feTurbulence`-based texture); speckle redesigned to actually differ from paper (was visually identical); Alert's default texture fixed to `kraft`
- `275e981` — sorted all texture swatches by lightness (`white → paper → speckle → parchment → canvas → kraft → chalkboard`) — previously the swatch order was arbitrary and didn't track visual weight

---

## Current Inventory

`src/components/`: accordion, alert, badge, button, card, checkbox, code-block, copy-button, divider, icon, icon-button, input, island, layout, list-item, modal, navigation-island, page, progress, prop-table, radio, select, skeleton, spinner, stamp, swatch, table, tabs, textarea, toast, tooltip.

---

## Known Gaps (not yet started)

Identified during the earlier component-gap analysis, not yet built:

- **Breadcrumb** — navigation trail, would live in the Navigation showcase group
- **Pagination** — page-index control, likely Layout or Navigation group
- **Menu / Dropdown** — generic anchored menu (Select already exists but is form-specific; this would be the general-purpose version, e.g. for context menus or the NavigationIsland)
- **Avatar** — user/entity image or initials badge

**Deferred, build only when a concrete need shows up** (explicit user decision):
- **Tag** — discussed against Badge/Stamp; decided the existing two cover current needs, don't add a third without a real use case

---

## Next Steps

No batch is currently queued — the last completed unit of work was the texture sort-order fix (`275e981`). Candidates for the next batch, in rough priority order:

1. Pick up 1-2 components from the gap list above (Breadcrumb + Pagination pair well; Menu/Dropdown is the more involved one since it needs the same portal-positioning pattern as Tooltip/Select/Modal)
2. Continue any further visual-quality passes the user flags while reviewing the showcase (texture/color consistency has been an iterative back-and-forth this phase — expect more of this)
3. Dark mode (`010-PAPER_UI_DARK_MODE_PLAN.md`, listed as upcoming in [plans.md](./plans.md) but never started) is still open once component coverage feels sufficient

This file should be updated as batches complete, rather than creating a new numbered plan per batch — mirroring how 009 tracked the earlier cleanup phase.
