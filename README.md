[![Build Status](https://travis-ci.org/Lominean/callsign.js.svg?branch=master)](https://travis-ci.org/Lominean/callsign.js)
[![Github All Releases](https://img.shields.io/github/downloads/Lominean/callsign.js/total.svg)]()

# callsign.js
This JavaScript library gives website users more ways to interract with written ITU call signs, including amateur radio.

# Usage
Add callsign.js and callsign.css in the `<head>` section.
```html
<link href="callsign.css" rel="stylesheet">
<script src="callsign.js" defer></script>
```

Tag the call signs with the custom HTML tag `<call-sign>`.
```html
<p>I heard <call-sign>SM8AYA</call-sign> and <call-sign>SA8YAY</call-sign> on shortwave.</p>
```

# Options
Options can be set in the variable `cset`. Make sure it's defined before callsign.js executes. The defaults are:
```javascript
var cset = {
  flag: true,
  zero: true
};
```

| Name | Description |
| --- | --- |
| flag | Set true to show country flag before the call signs. |
| zero | Set true to replace 0 with 0&#x0338; in call signs. |

# References
* [ARTICLE 19 – Identification of stations](http://life.itu.int/radioclub/rr/art19.pdf)
* [ITU prefix – Wikipedia](https://en.wikipedia.org/wiki/ITU_prefix)
* [ITU Table of Allocation of International Call Sign Series](https://www.arrl.org/international-call-sign-series)
