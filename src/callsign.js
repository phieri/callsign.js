/**
 * @file Highlight amateur radio call signs in web pages with this JavaScript library
 * @author Philip Eriksson <www.philiperiksson.se>
 * @see {@link https://github.com/Lominean/callsign.js|Repository at GitHub}
 */

/** @constant */
const ITU_PREFIX_TABLE = {
  AL: "ZA",
  AR: "AY-AZ,LO-LW",
  AT: "OE",
  AU: "AX,VH-VN,VZ",
  BR: "PP-PY,ZV-ZZ",
  CA: "CF-CK,CY-CZ,VA-VG,VO,VX-VY,XJ-XO",
  CH: "HB,HE",
  CN: "B,VR,XS,XX",
  DE: "DA-DR",
  DK: "OU-OZ,XP",
  EE: "ES",
  ES: "AM-AO,EA-EH",
  FI: "OF-OJ",
  FR: "F,HW-HY",
  GB: "G,M,VP-VQ,VS,ZB-ZJ,ZN-ZO,ZQ",
  HU: "HA,HG",
  ID: "AT-AW,VT-VW",
  IS: "TF",
  IT: "I",
  JP: "JA-JS",
  KR: "DS-DT,HL",
  NL: "PA-PI,PJ",
  NO: "LA-LN",
  PL: "HF,SN-SR",
  RO: "YO-YR",
  RU: "R,UA-UI",
  SE: "SA-SM",
  SK: "OM",
  TH: "HS",
  UA: "EM-EO,UR-UZ",
  US: "AA-AL,K,N,W",
  ZA: "ZR-ZU"
};

/** @constant */
const CALLSIGN_REGEX = /\D{1,3}\d\D{1,3}/;

/**
 * Converts an ISO 3166-1 alpha-2 code to a flag emoji.
 * @param {!string} code
 * @returns {string}
 */
function flag(code) {
  'use strict';
  return String.fromCodePoint(...[...code].map(c => c.charCodeAt() + 127397));
}

/**
 * Checks if a character combination is inside a specified range.
 * @param {!string} value
 * @param {!string} range
 * @returns {boolean}
 */
function inRange(value, range) {
  'use strict';
  let split = range.split('-');

  if (value.length < split[0].length)
    return false;

  if (split[0] == split[1])
    return false;

  if (split.length == 1 && split[0] == value)
    return true;

  if (split[0]) {
    let newRange = split[1];
    return inRange(value, newRange);
  }
}

/**
 * @param {string} text
 */
function examine(text) {
  'use strict';
  console.log(text);
}

/**
 * Recursive method to traverse the DOM tree.
 * @param {!Element} element
 */
function traverse(element) {
  'use strict';
  if (element.childNodes.length == 0) {
    examine(element.textContent);
  } else if (element.childNodes.length >= 1) {
    element.childNodes.forEach(function (nodes) {
      traverse(nodes);
    });
  }
}

function callsign() {
  'use strict';

  if (csettings.debug == null || csettings.debug == true) {
    performance.mark("callsign-start");
  }

  if (csettings.search == null || csettings.search == true) {
    traverse(document.body);
  }

  if (csettings.flag == null || csettings.flag == true) {
    let callsignElements = document.getElementsByTagName('callsign');
    for (let i = 0; i < callsignElements.length; i++) {
      for (let row in ITU_PREFIX_TABLE) {
        if (inRange(callsignElements[i], row)) {
          alert('Hit!');
        }
      }
    }
  }

  if (csettings.debug == null || csettings.debug == true) {
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
