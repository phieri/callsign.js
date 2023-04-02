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
Options can be set as attributes in the `<link>` tag.

| Name             | Default | Description |
| ---------------- | ------- | ----------- |
| `data-flag`      | `true`  | Show country flag before the call signs. |
| `data-monospace` | `true`  | Render call sign with a monospace font. |
| `data-phonetic`  | `true`  | Add phonetic information for screen readers. |
| `data-search`    | `false` | Find and mark up untagged call signs in the document. |

# Minification
The files are intentionally not provided [minified](https://en.wikipedia.org/wiki/Minification_(programming)).
Amateur radio is about learning and experimenting.
Minified files makes it drastically harder to understand the code.

# References
* [ITU Radio Regulations Article 19 – Identification of stations](http://life.itu.int/radioclub/rr/art19.pdf)
* [ITU prefix – Wikipedia](https://en.wikipedia.org/wiki/ITU_prefix)
* [ITU Table of Allocation of International Call Sign Series](https://www.arrl.org/international-call-sign-series)
