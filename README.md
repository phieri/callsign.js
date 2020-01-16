![](https://github.com/Lominean/callsign.js/workflows/main.yml/badge.svg)

# callsign.js
This JavaScript library gives website users more ways to interract with written ITU call signs, including amateur radio.

# Usage
Add callsign.js and callsign.css in the `<head>` section.
```html
<link href="callsign.css" rel="stylesheet">
<script id="callsign-js" src="callsign.js" defer></script>
```

Tag the call signs with the [custom HTML tag](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) `<call-sign>`.
```html
<p>I had contact with <call-sign>SM8AYA</call-sign> and <call-sign>SA8YAY</call-sign> on shortwave.</p>
```

# Options
Options can be set as attributes in the `<link>` tag. The defaults are:

| Name          | Default | Description |
| ------------- | ------- | ----------- |
| `data-flag`   | `true`  | Show country flag before the call signs. |
| `data-zero`   | `true`  | Replace 0 (zero) with 0&#x0338; or &#216; in call signs. |
| `data-search` | `false` | Search for untagged callsigns in the document. |

# Minification
This library is intentionally not provided with minified files.
Amateur radio is about learning and experimenting.
Minified files makes it drastically harder to understand how the code works.

# References
* [ARTICLE 19 – Identification of stations](http://life.itu.int/radioclub/rr/art19.pdf)
* [ITU prefix – Wikipedia](https://en.wikipedia.org/wiki/ITU_prefix)
* [ITU Table of Allocation of International Call Sign Series](https://www.arrl.org/international-call-sign-series)
