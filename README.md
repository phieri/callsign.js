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
<p>I heard <span class="callsign">SM8AYA</span> in contact with <span class="callsign">SA8YAY</span> on shortwave.</p>
```

# Options

## Turn off search
Parsing the entire document takes alot of computational cycles.

## Custom overlay

## Replace zero
Enable the replacement of 0 with 0&#x0338;.

# References
[ITU Table of Allocation of International Call Sign Series](http://www.arrl.org/international-call-sign-series)
