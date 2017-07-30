# callsign.js

Add callsign.js and callsign.css to the HTML document's `head` section.
```html
<link href="callsign.css" rel="stylesheet">
<script src="callsign.js" defer></script>
```

It will then parse the document, looking for common callsign patterns.
```html
<p>I heard SM8AYA in contact with SA8YAY on shortwave.</p>
```
Here `SM8AYA` and `SA8YAY` will be identified.

You can turn off the pattern search and rely on markup.
```html
<p>I heard <span class="callsign">SM8AYA</span> and <span class="callsign">SA8YAY</span> on shortwave.</p>
```

# Options
Options can be set in the variable `callsign`. Make sure it is defined before callsign.js executes. The defaults are like this:
```javascript
var callsign = {
  flag: true,
  search: true,
  zero: true
};
```

| Name | Description |
| --- | --- |
| flag | Show the country flag before the call sign. |
| search | Parsing the entire document can take alot of computational cycles. Turn it off if you don't need it. |
| zero | Enable the replacement of 0 with 0&#x0338; in call signs. |

# References
[ITU Table of Allocation of International Call Sign Series](https://www.arrl.org/international-call-sign-series)
