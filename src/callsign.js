/**
 * callsign.js
 * @see {@link https://github.com/Lominean/callsign.js|Repository at GitHub}
 */

var prefixTable = {
  "SA–SM": "SE",
  "DA–DR": "DE",
  "EM–EO": "UA"
};

function flag(code) {
  "use strict";
  return String.fromCodePoint(...[...code].map(c => c.charCodeAt() + 127397))
}

function examine(text) {
  "use strict";
  alert(text);
}

function traverse(ele) {
  "use strict";
  if (ele.childNodes.length == 0) {
    examine(ele.textContent);
  } else {
    document.ele.childNodes.forEach(function () {
      traverse(children);
    });
  }
}

function callsign() {
  "use strict";
  var csregex = /\D{1,3}\d\D{1,3}/;

  traverse(document.body);
}

callsign();
