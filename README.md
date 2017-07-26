# callsign.js

Add callsign.js to the HTML document's `head` section.
```html
<script src="callsign.js" defer></script>
```

It will then parse the document, looking for common callsign patterns.
```html
<p>I heard SM8AYA in contact with SA8YAY on shortwave.</p>
```

You can turn off the search and rely on markup.
```html
<p>I heard <span class="callsign">SM8AYA</span> and <span class="callsign">SA8YAY</span> on shortwave.</p>
```

# Options
Options can be set in the variable `callsign`. The defaults are like this:
```javascript
var callsign = new Map(
  ['search', true],
  ['zero', true]
);
```

## Search
Parsing the entire document takes alot of computational cycles.

## Zero
Enable the replacement of 0 with 0&#x0338; in callsigns.

## Custom overlay
The overlay is declared.

# References
[ITU Table of Allocation of International Call Sign Series](https://www.arrl.org/international-call-sign-series)
