# callsign.js - ITU Radio Call Sign JavaScript Library

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Repository Overview
callsign.js is a JavaScript library that highlights ITU radio call signs (including amateur radio) in web pages. The library provides interactive features like country flags, phonetic spelling, and automatic call sign detection. It's intentionally not minified to support the amateur radio community's learning and experimentation goals.

## Working Effectively

### Bootstrap and Dependencies
- Install dependencies: `npm install` -- takes ~6 seconds on subsequent runs (~0.6 seconds), ~6 seconds on first install
- No build process required - the library is used directly from source files
- Dependencies: Only ESLint for code quality checking

### Linting and Code Quality
- Run linting: `npx eslint src/` -- takes ~0.6 seconds. NEVER CANCEL.
- ALWAYS run linting before committing changes or CI will fail
- ESLint configuration is in `eslint.config.js` using flat config format
- Linting rules include indent, complexity, and regex validation checks

### Testing and Validation
- No automated test suite exists - validation is manual
- ALWAYS test library functionality by creating an HTML page that includes:
  - `<script id="callsign-js" src="src/callsign.js" defer></script>`
  - `<link rel="stylesheet" href="src/callsign.css">`
  - Sample call signs wrapped in `<call-sign>` tags
- Test functionality by serving files via HTTP server (file:// protocol doesn't work)
- Start test server: `python3 -m http.server 8081` from repository root
- ALWAYS verify these features work after changes:
  - Call signs display with country flags
  - Phonetic information in aria-labels and tooltips
  - Monospace font rendering
  - Automatic call sign detection (when data-search="true")

### Manual Validation Requirements
When making changes to the library, ALWAYS perform these validation steps:
1. Create a test HTML page with various call signs (US: W1AW, Swedish: SM8AYA, German: DL1ABC, etc.)
2. Start HTTP server and load the page
3. Verify call signs are highlighted with proper styling
4. Check that country flags appear correctly
5. Verify phonetic information is accessible (hover tooltips, screen reader content)
6. Test with different data-* attribute configurations

## Repository Structure

### Source Files
- `src/callsign.js` - Main JavaScript library (6,228 characters)
- `src/callsign.css` - Styling for call sign highlighting (1,035 characters)

### Configuration Files
- `package.json` - Minimal dependencies (only ESLint)
- `eslint.config.js` - ESLint flat configuration
- `.editorconfig` - Editor configuration
- `.gitignore` - Excludes minified files, node_modules, package-lock.json

### Documentation
- `README.md` - Usage instructions and options
- `LICENSE` - MIT license

## Key Features and Options
The library supports these data-* attributes on the script tag:
- `data-flag="true"` (default) - Show country flags
- `data-monospace="true"` (default) - Use monospace font
- `data-phonetic="true"` (default) - Add phonetic information
- `data-search="false"` (default) - Auto-detect untagged call signs

## CI/CD Pipeline
- GitHub Actions workflow: `.github/workflows/test.yml`
- Runs on: Ubuntu latest with Node.js 20
- Only validates: `npm install` and `npx eslint src/`
- NO other build or test steps exist

## Common Tasks

### Development Workflow
1. Make changes to `src/callsign.js` or `src/callsign.css`
2. Run `npx eslint src/` to validate code quality
3. Create test HTML page to validate functionality
4. Start HTTP server: `python3 -m http.server 8081`
5. Open browser to `http://localhost:8081/test.html`
6. Verify all features work correctly

### Adding New Country Prefixes
- Edit the `PREFIX_TABLE` Map in `src/callsign.js`
- Add ISO country code and array of radio prefixes
- Always run linting after changes
- Test with sample call signs using new prefixes

### Modifying Styling
- Edit `src/callsign.css`
- Test changes with various call sign examples
- Ensure accessibility is maintained (contrast, screen readers)

## Important Notes
- Library is intentionally NOT minified (amateur radio learning philosophy)
- No complex build process - files are used directly
- Uses ES6 modules and modern JavaScript features
- Relies on Custom Elements API for `<call-sign>` tags
- Designed for browser environments, not Node.js

## Common Pitfalls
- Don't try to build the project - there's no build process
- Don't test with file:// URLs - use HTTP server
- Always run ESLint before committing
- Remember this is a browser library, not a Node.js module
- Test with various call sign formats and country prefixes

## Timing Expectations
- `npm install`: ~6 seconds first time, ~0.6 seconds subsequent
- `npx eslint src/`: ~0.6 seconds. NEVER CANCEL.
- No other time-consuming operations exist in this project