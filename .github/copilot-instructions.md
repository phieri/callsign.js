# callsign.js - Copilot Instructions

Always use these instructions before searching for ad hoc solutions. The repository is small and the project conventions are explicit; when information conflicts with the repo itself, prefer the files in the repo (`README.md`, `package.json`, `tests/`, and CI workflow files) over assumptions.

## Repository Overview
callsign.js is a browser-side JavaScript library that highlights ITU radio call signs, including amateur radio call signs, in web pages. It wraps each rendered call sign in a custom element (`<call-sign>`), adds optional country flags and phonetic information, and can also discover untagged call signs in text when `data-search="true"` is enabled.

The repo is intentionally source-first and not minified. There is no build step or bundler workflow; source files are used directly in the browser.

## File Layout
- `src/callsign.js` — main library logic
- `src/callsign.css` — default styling for rendered call signs
- `tests/` — real Jest test suite for parsing, validation, prefixes, and search behavior
- `test-validation.html` — browser validation page for manually checking render output
- `README.md` — user-facing docs and usage examples
- `.github/workflows/ci.yml` — authoritative CI validation commands for the repo
- `eslint.config.js` — flat ESLint configuration
- `package.json` — scripts and dependency versions

## Working Efficiently

### Install and validation commands
Run these commands from the repository root:
- `npm install`
- `npm run lint`
- `npm test`

These are the commands the repository uses in CI. The repo does not have a separate build step.

### CI status and real expectations
The project is validated with GitHub Actions in `.github/workflows/ci.yml`:
- Node.js 24 is used in CI
- `npm install` runs first
- `npm run lint` runs second
- `npm test` runs third

Do not assume the repository has no automated tests. The `tests/` directory contains real Jest coverage and is the source of truth.

## Development Workflow
1. Edit `src/callsign.js` or `src/callsign.css` directly.
2. Run `npm run lint` to catch syntax and code-quality regressions.
3. Run `npm test` to verify the library logic still passes the existing Jest suite.
4. For browser-specific rendering checks, use the included `test-validation.html` page.
5. Serve the repo over HTTP rather than using a `file://` URL.

## Browser Validation Requirements
When a change affects rendering, flag appearance, phonetics, or search behavior, validate in a browser using a local HTTP server.

Use:
- `python3 -m http.server 8081`
- then open `http://localhost:8081/test-validation.html`

Check that:
- `<call-sign>` elements render with the expected styling
- country flags appear for valid prefixes
- phonetic content is available in `aria-label` / tooltip output
- monospace styling is applied
- `data-search="true"` finds valid untagged call signs without false positives

## Known Issues and Workarounds
### 1. `file://` validation fails
Problem: loading the page by opening the HTML directly from disk does not behave reliably for this library's browser-side script and custom-element setup.

Workaround: always serve the repo with `python3 -m http.server 8081` and validate via `http://localhost:8081/...` instead.

### 2. Stale assumptions about testing
Problem: it is easy to incorrectly assume there is no automated test suite or that only linting matters. This repo does have Jest tests and a CI workflow that runs them.

Workaround: treat `.github/workflows/ci.yml`, `package.json`, and `tests/` as authoritative. Use `npm test` as part of the standard verification flow rather than relying only on a manual browser-only check.

### 3. Avoid build-time assumptions
Problem: the repo is source-based and intentionally unminified, so there is no package build or generated output to regenerate.

Workaround: make the change directly in `src/` and validate through the existing lint/test workflow, not by creating a build pipeline.

## Common Pitfalls
- Do not add a bundling/build step unless the task explicitly requires it.
- Do not use `file://` URLs for browser validation.
- Do not treat README examples as the only source of truth when CI and package scripts are available.
- Keep the library intentionally unminified and readable.
- Respect the custom-element design and data attributes (`data-flag`, `data-monospace`, `data-phonetic`, `data-search`, `data-css-path`).

## Expected Validation Before Completion
For any change in the library logic or styling, the safe completion checklist is:
- `npm run lint` passes
- `npm test` passes
- manual browser validation passes on `http://localhost:8081/test-validation.html`

This repo is small enough that the fastest reliable path is to validate with the existing project commands instead of inventing custom tooling.