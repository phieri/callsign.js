![CI](https://github.com/phieri/callsign.js/workflows/CI/badge.svg)

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
