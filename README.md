# callsign.js
This JavaScript library gives website users more ways to interact with written [ITU](https://www.itu.int/en/) call signs, including for amateur radio.

## Demo
See a live example at [https://phieri.github.io/callsign.js/](https://phieri.github.io/callsign.js/)

# Usage
Upload `callsign.js` and `callsign.css` from `src/` to the same directory on your web server and include the script on the page. The library creates a shadow root for each rendered call sign and loads the stylesheet beside the script automatically unless you override it with `data-css-path`.

```html
<script id="callsign-js" src="callsign.js" defer></script>
```

Tag the call signs with the [custom HTML tag](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) `<call-sign>`:
```html
<p>I had contact with <call-sign>SM8AYA</call-sign> on shortwave.</p>
```

# Options
Options can be set as attributes in the `<script>` tag.

| Name             | Default | Description |
| ---------------- | ------- | ----------- |
| `data-flag`      | `true`  | Show a country flag before the call sign. |
| `data-monospace` | `true`  | Render the call sign with a monospace font. |
| `data-phonetic`  | `true`  | Add phonetic information for screen readers and tooltips. |
| `data-search`    | `false` | Find and mark up untagged call signs in the document. |
| `data-css-path`  | `callsign.css` beside the script | Optional page-relative or absolute same-origin HTTP(S) stylesheet URL. Invalid or cross-origin overrides fall back to the default. |

## Supported call signs and dynamic content
The parser supports a 1–3 character alphanumeric prefix, one area digit, and a 1–3 letter suffix, optionally followed by `/0`–`/9`, `/P`, `/M`, `/MM`, `/AM`, or `/QRP`. Explicit tags accept lowercase text and display it in uppercase. Unsupported formats remain visible unchanged; arbitrary text inside a tag is never truncated to a partial match.

Automatic detection is deliberately uppercase-only and matches complete tokens, including next to punctuation. It skips existing `<call-sign>` elements; `<script>`, `<style>`, `<code>`, `<pre>`, `<textarea>`, `<select>`, `<option>`, `<noscript>`, and `<template>` elements; SVG and MathML; and elements with a `contenteditable` value other than `false`, including their descendants.

Prefix matching is a heuristic, not proof that a station is licensed. The bundled table is not a complete or continuously updated registry of all ITU assignments or DXCC entities. More-specific entries take priority (for example, `HB0` for Liechtenstein and `XX9` for Macau); other flags reflect the allocated country rather than a precise operating location. Formats such as `EA8/W1AW` and special-event calls outside the grammar are not automatically detected.

Elements created with `document.createElement('call-sign')` render when inserted and update when their text changes. Auto-search runs once on DOM readiness; after adding new untagged content, call `window.Callsign.searchCallsigns()` again. Repeated searches do not nest or duplicate tags. Options are read once from the script and are not reactive.

## Customization
You can customize the appearance by overriding the CSS custom properties on the `<call-sign>` host element. These values flow into the shadow DOM that wraps each rendered call sign:
```css
call-sign {
  --cs-border-color: #007acc;
  --cs-background-color: #e0f0ff;
  --cs-border-radius: 5px;
}
```

# Testing
The project uses Jest for unit tests, ESLint for code quality checks, and manual browser validation for the rendered shadow-DOM output.

## Running Tests
```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run linting
npm run lint
```

## Test Coverage
The current suite covers the library's core behavior in browser-like conditions:
- call sign parsing and validation
- country prefix lookups and flag generation
- phonetic expansion
- auto-detection of untagged call signs in text content

The test files are located in the `tests/` directory.

For browser validation, run `python3 -m http.server 8081` from the repository root and open `http://localhost:8081/test-validation.html`. Check flags, phonetic labels/tooltips, monospace styling, portable indicators, and auto-detected elements. Use HTTP rather than `file://`. There is no build step or hardware dependency; GitHub Pages deployment copies `src/` assets into `docs/`.

# Minification
The files are intentionally not provided [minified](https://en.wikipedia.org/wiki/Minification_(programming)).
Amateur radio is about learning and experimenting.
Minified files makes it drastically harder to understand the code.

# References

## ITU Prefix Table Data Sources
The PREFIX_TABLE mapping is a bundled subset of allocations. Consult the current [ITU call sign series table](https://www.itu.int/en/ITU-R/terrestrial/fmd/Pages/call_sign_series.aspx) when updating it:

* [ITU Radio Regulations Appendix 42 – Table of allocation of international call sign series](https://www.itu.int/pub/R-REG-RR/en) - Official ITU allocation table
* [ITU Radiocommunication Bureau Circular](https://www.itu.int/en/ITU-R/conferences/wrc/Pages/default.aspx) - Current call sign assignments and updates
* [ARRL International Call Sign Series](https://www.arrl.org/international-call-sign-series) - Comprehensive amateur radio call sign reference
* [ITU Master International Frequency Register (MIFR)](https://www.itu.int/en/ITU-R/terrestrial/fmd/Pages/mifr.aspx) - Official frequency and call sign database
* [Country-specific amateur radio licensing authorities](https://www.iaru.org/member-societies/) - National regulatory bodies via IARU member societies
* [Radio-Electronics.com Call Sign Database](https://www.radio-electronics.com/info/amateur_radio/callsigns/international_call_sign_prefixes.php) - Cross-reference for prefix verification

## General References
* [ITU Radio Regulations Article 19 – Identification of stations](http://life.itu.int/radioclub/rr/art19.pdf)
* [ITU prefix – Wikipedia](https://en.wikipedia.org/wiki/ITU_prefix)
* [International Amateur Radio Union (IARU)](https://www.iaru.org/) - Global amateur radio coordination
