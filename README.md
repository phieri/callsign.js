# callsign.js
This JavaScript library gives website users more ways to interact with written [ITU](https://www.itu.int/en/) call signs, including for amateur radio.

# Usage
Upload callsign.js and callsign.css to the webserver and add callsign.js to the `<head>` section.
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
| `data-flag`      | `true`  | Show country flag before the call signs. |
| `data-monospace` | `true`  | Render call sign with a monospace font. |
| `data-phonetic`  | `true`  | Add phonetic information for screen readers. |
| `data-search`    | `false` | Find and mark up untagged call signs in the document. |
| `data-css-path`  | `callsign.css` | Custom path to the CSS stylesheet. |

## Customization
You can customize the appearance by overriding CSS custom properties in your stylesheet:
```css
call-sign::part(wrapper) {
  --cs-border-color: #007acc;
  --cs-background-color: #e0f0ff;
  --cs-border-radius: 5px;
}
```

# Testing
This project includes comprehensive unit tests using Jest with a primary focus on regex pattern validation.

## Running Tests
```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run linting
npm run lint
```

## Test Coverage (71 tests total)
The test suite focuses primarily on validating the two core regex patterns that drive the library's functionality:

### 1. **SEARCH_REGEX Pattern Tests** (`tests/searchCallsigns.test.js`)
Tests the regex pattern `/([A-Z,\d]{1,3}\d[A-Z]{1,3}(?:\/\d)?)\s/` that detects call signs in text:
- Valid call sign pattern matching (single/double/triple letter prefixes)
- Portable indicator detection (`/3`, `/5`, etc.)
- Edge cases and boundary conditions
- Invalid pattern rejection (no trailing space, wrong format, etc.)
- Real-world call sign examples from multiple countries
- Whitespace handling and greedy matching behavior

### 2. **PARTS_REGEX Pattern Tests** (`tests/partsRegex.test.js`)
Tests the regex pattern `/([A-Z,\d]{1,3})(\d)([A-Z]{1,3})(?:\/(\d))?/` that parses call signs into components:
- Prefix parsing (1-3 characters: W, SM, VK2, etc.)
- Area digit extraction (0-9)
- Suffix parsing (1-3 letters: A, AB, ABC)
- Portable indicator capture group
- Greedy matching behavior with long prefixes
- Component extraction from embedded text

### 3. **Supporting Method Tests**
- `tests/getFlag.test.js` - ISO code to Unicode flag conversion (used after PREFIX_TABLE matching)
- `tests/getPhonetics.test.js` - Phonetic alphabet mapping for regex-parsed call signs

Test files are located in the `tests/` directory with clear documentation of each regex pattern's behavior and edge cases.

# Minification
The files are intentionally not provided [minified](https://en.wikipedia.org/wiki/Minification_(programming)).
Amateur radio is about learning and experimenting.
Minified files makes it drastically harder to understand the code.

# References

## ITU Prefix Table Data Sources
The PREFIX_TABLE mapping in this library is compiled from multiple authoritative sources to ensure accuracy across all 160 countries:

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
