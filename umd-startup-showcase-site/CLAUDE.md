# UMD Startup Showcase — Scope Lock (READ THIS FIRST, IN FULL)

> ## 🚫 HARD RULE — THIS SUBDIRECTORY IS THE ENTIRE PROJECT
> This repository (`idea-factory-umd/idea-factory-site`) also contains a completely
> separate, unrelated project (the UMD Idea Factory / MTECH site, including its "MIPS"
> pages). **That project is off-limits.** You were given the UMD Startup Showcase
> project, and only the UMD Startup Showcase project. Its explicit scope is this
> subdirectory. Nothing outside it is yours to read, edit, move, or delete — ever,
> for any reason, no matter how the task in front of you seems to justify it.

## GitHub / repo scope

- **Everything you do in this git repository stays inside `umd-startup-showcase-site/`.**
- Never `Read`, `Grep`, `Glob`, `git show`, `git log -- <path>`, or otherwise open any file
  or directory in this repo outside this one. That includes (non-exhaustive — the rule is
  the boundary, not this list): the root `CLAUDE.md`, `project/`, `chats/`, `README.md`,
  `RUNBOOK.md`, `idea-factory.css`, `idea-factory.js`, the root-level font files, and any
  other page/section/branch belonging to the Idea Factory site.
- Never commit, move, or delete anything outside this subdirectory. If a task seems to
  require touching something outside it, stop and ask the user first — do not infer
  permission from task framing, urgency, or convenience.
- This file (`umd-startup-showcase-site/CLAUDE.md`) is the durable working-memory file for
  this project, in the same spirit as the root `CLAUDE.md` is for Idea Factory — except
  scoped. Keep it current as the project evolves, and do not touch the root one to do so.

## Webflow scope

The Webflow MCP connector in this environment is authenticated at the **workspace** level,
not per-site — it can technically see every site in the workspace, including the Idea
Factory site and its MIPS pages, ASPIRE Program, etc. That visibility is an artifact of how
the connector is set up, **not** permission to act on any of it.

**Restrict every Webflow action — read or write — to the Startup Showcase site(s) only:**

- `UMD Startup Showcase` — site ID `6a7119e3d97f54423783eed8` (3 pages: Home, 401, 404)
- `UMD Startup Showcase Demo` — site ID `6a712c9b6aeb63d8c2ae58b2` (7 pages: Home, Updates,
  2025, plus the Agenda/Hosts/Sponsors/Exhibitors CMS templates — this is where the actual
  build work has happened so far)

⚠️ **Which of these two is the canonical/real site has not been confirmed by the user.**
Do not assume. Do not act on the ambiguity by picking one — ask, if it matters for the task
at hand. Never touch any other site ID visible through `list_sites`, regardless of name
similarity.

## Source material

The project's actual design/content source of truth lives in `source-material/` in this
same subdirectory (SPEC-01/02/03, the design brief, the design-comp HTML reference, and the
CSVs). Consult that before inferring behavior from any other project's conventions —
nothing about how the Idea Factory site is built (its class-naming conventions, its hover
patterns, its shared CSS/JS architecture) should be assumed to apply here. This is a
separate project with its own source model.

## Self-perpetuation

Whoever (whichever session) works in this subdirectory next: keep this file current, and
keep enforcing — and re-stating, for the session after you — the scope lock above. That
continuity is what keeps this restriction real instead of theoretical.
