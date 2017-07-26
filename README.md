# callsign.js

Add callsign.js to the HTML document's `head` section.

```html
<script src="callsign.js" defer></script>
```

It will then parse the document, looking for common callsign patterns.

```html
<p>I heard SM8AYA in contact with SA8YAY on shortwave.</p>
```

If you're using it for an automated system, you can turn off the search and rely on markup.

```html
<p>I heard <span class="callsign">SM8AYA</span> in contact with <span class="callsign">SA8YAY</span> on shortwave.</p>
```

# Options

## Turn off search

## Custom overlay

# References
