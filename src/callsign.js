/**
 * @file Highlight amateur radio call signs in web pages with this JavaScript library
 * @author Philip Eriksson <philiperiksson.se>
 * @see {@link https://github.com/Lominean/callsign.js|Repository at GitHub}
 */

/** @constant */
const ItuPrefixTable = {
  AL: "ZA",
  AR: "AY-AZ,LO-LW",
  AT: "OE",
  BR: "PP-PY,ZV-ZZ",
  DE: "DA-DR",
  ES: "EA-EH",
  FI: "OF-OJ",
  HU: "HA,HG",
  IS: "TF",
  JP: "JA-JS",
  NO: "LA-LN",
  PL: "HF,SN-SR",
  RO: "YO-YR",
  SE: "SA-SM",
  TH: "HS",
  UA: "EM-EO,UR-UZ",
  ZA: "ZR-ZU"
};

/**
 * Converts an ISO 3166-1 alpha-2 code to a flag emoji.
 * @param {string} code
 * @returns {string}
 */
function flag(code) {
  'use strict';
  return String.fromCodePoint(...[...code].map(c => c.charCodeAt() + 127397))
}

/**
 * Checks if a character combination is inside a specified range.
 * @param {string} value
 * @param {string} range
 * @returns {boolean}
 */
function inRange(value, range) {
  'use strict';
  let split = ran.split("-");

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
/**
 * Recursive method to traverse the DOM tree.
 * @param {object} element
 */
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
