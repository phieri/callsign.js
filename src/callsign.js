/**
 * callsign.js
 * @see {@link https://github.com/Lominean/callsign.js|Repository at GitHub}
 */

const ItuPrefixTable = {
  AT: "OE",
  DE: "DA–DR",
  ES: "EA–EH",
  FI: "OF–OJ",
  IS: "TF",
  NO: "LA–LN",
  PL: "SN–SR",
  SE: "SA–SM",
  UA: "EM–EO",
  UA: "UR–UZ"
};

/**
 * Converts an ISO 3166-1 alpha-2 code to a flag emoji.
 * @param code
 * @returns {string}
 */
function flag(code) {
  'use strict';
  return String.fromCodePoint(...[...code].map(c => c.charCodeAt() + 127397))
}

/**
 * Checks if a character combination is inside a specified range.
 * @param value
 * @param range
 * @returns {boolean}
 */
function inRange(value, range) {
  'use strict';
  let split = ran.split("–");

  if (val.length != split[0].length)
    return false;

  if (split.length === 1 && split[0] == val)
    return true;
}

function examine(text) {
  'use strict';
  console.log(text);
}

function traverse(ele) {
  'use strict';
  if (ele.childNodes.length == 0) {
    examine(ele.textContent);
  } else if (ele.childNodes.length >= 1) {
    ele.childNodes.forEach(function (nodess) {
      traverse(nodess);
    });
  }
}

function callsign() {
  'use strict';

  if (csettings !== null && csettings.measure == true) {
    performance.mark("callsign-start");
  }

  const csregex = /\D{1,3}\d\D{1,3}/;
  traverse(document.body);

  if (csettings !== null && csettings.measure == true) {
    performance.mark("callsign-done");
    performance.measure("callsign", "callsign-start", "callsign-done");
    let measures = performance.getEntriesByName("callsign");
    let measure = measures[0];
    console.log('callsign.js execution took ', measure.duration);
    performance.clearMarks();
    performance.clearMeasures();
  }
}

callsign();
