[![Build Status](https://travis-ci.org/Lominean/callsign.js.svg?branch=master)](https://travis-ci.org/Lominean/callsign.js)

# callsign.js
This JavaScript library gives website users more ways to interract with written amateur radio callsigns.

# Usage
Add callsign.js and callsign.css to the HTML document's `head` section.
```html
<link href="callsign.css" rel="stylesheet">
<script src="callsign.js" defer></script>
```

Tag the call signs with the HTML tag `<callsign>`.
```html
<p>I heard <callsign>SM8AYA</callsign> and <callsign>SA8YAY</callsign> on shortwave.</p>
```

# Options
Options can be set in the variable `cset`. Make sure it's defined before callsign.js executes. The defaults are like this:
```javascript
var cset = {
  debug: false,
  flag: true,
  zero: true
};
```

| Name | Description |
| --- | --- |
| debug | Write various information to the browser console. |
| flag | Show country flag before the call sign. |
| zero | Replace 0 with 0&#x0338; in call signs. |

# References
* [ARTICLE 19 – Identification of stations](http://life.itu.int/radioclub/rr/art19.pdf)
* [ITU prefix – Wikipedia](https://en.wikipedia.org/wiki/ITU_prefix)
* [ITU Table of Allocation of International Call Sign Series](https://www.arrl.org/international-call-sign-series)
