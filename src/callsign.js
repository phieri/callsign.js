/**
 * callsign.js
 * @see {@link https://github.com/Lominean/callsign.js|Repository at GitHub}
 */

const prefixTable = {
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
  console.log(text);
}

function traverse(ele) {
  "use strict";
  if (ele.childNodes.length == 0) {
    examine(ele.textContent);
  } else if (ele.childNodes.length >= 1) {
    ele.childNodes.forEach(function(nodess) {
      traverse(nodess);
    });
  }
}

function callsign() {
  "use strict";
  performance.mark("callsign-start");

  const csregex = /\D{1,3}\d\D{1,3}/;
  traverse(document.body);

  performance.mark("callsign-done");
  performance.measure("callsign", "callsign-start", "callsign-done");
  let measures = performance.getEntriesByName("callsign");
  let measure = measures[0];
  console.log('callsign.js execution took ', measure.duration);
  performance.clearMarks();
  performance.clearMeasures();
}

callsign();
