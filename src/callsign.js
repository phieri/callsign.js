/**
 * @file Highlight radio call signs (including amateur) in web pages with this JavaScript library.
 * @version 1.0.0-alpha
 * @author Philip Eriksson <http://www.philiperiksson.se>
 * @see {@link https://github.com/Lominean/callsign.js|Repository at GitHub}
 */

/** @constant */
const ITU_PREFIX_TABLE = {
  AL: 'ZA',
  AR: 'AY-AZ,LO-LW',
  AT: 'OE',
  AU: 'AX,VH-VN,VZ',
  BG: 'LZ',
  BR: 'PP-PY,ZV-ZZ',
  CA: 'CF-CK,CY-CZ,VA-VG,VO,VX-VY,XJ-XO',
  CH: 'HB,HE',
  CM: 'TJ',
  CN: 'B,VR,XS,XX',
  DE: 'DA-DR',
  DK: 'OU-OZ,XP',
  EE: 'ES',
  ES: 'AM-AO,EA-EH',
  FI: 'OF-OJ',
  FR: 'F,HW-HY',
  GA: 'TR',
  GB: 'G,M,VP-VQ,VS,ZB-ZJ,ZN-ZO,ZQ',
  GQ: '3C',
  HI: '4V',
  HU: 'HA,HG',
  ID: 'AT-AW,VT-VW',
  IL: '4X,4Z',
  IS: 'TF',
  IT: 'I',
  JP: 'JA-JS',
  KR: 'DS-DT,HL',
  LT: 'LY',
  MC: '3A',
  ML: 'TZ',
  MU: '3B',
  NL: 'PA-PI,PJ',
  NO: 'LA-LN',
  PL: 'HF,SN-SR,3Z',
  RO: 'YO-YR',
  RU: 'R,UA-UI',
  SE: 'SA-SM,7S',
  SK: 'OM',
  TD: 'TT',
  TH: 'HS',
  UA: 'EM-EO,UR-UZ',
  US: 'AA-AL,K,N,W',
  VA: 'HV',
  YE: '7O',
  ZA: 'ZR-ZU'
};

/** @constant */
const CALLSIGN_REGEX = /(\d?\D{1,3})\d\D{1,3}(\/\D{1,3})?/;

/**
 * Converts an ISO 3166-1 alpha-2 code to a flag emoji.
 * @param {!string} code The ISO 3166-1 alpha-2 code
 * @returns {string}
 */
function getFlag(code) {
  'use strict';
  return String.fromCodePoint(...[...code].map(c => c.charCodeAt() + 127397));
}

/**
 * Recursive method to expand a letter range.
 * @param {!string} start The first word of the range
 * @param {!string} end The last word of the range
 * @returns {Array}
 */
function expandRange(start, end) {
  'use strict';
  let range = {};
  if (start == end) {
    return end;
  } else {
    let newStart;
    newStart = String.fromCharCode(start.charCodeAt(start.length-1)+1);
    range.push(expandRange(newStart, end));
  }
  return range;
}

/**
 * Expand the prefix table.
 */
function expandTable() {
  'use strict';
  let len = Object.keys(ITU_PREFIX_TABLE).length;
  for (let i = 0; i < len; ++i) {
    let newRow = [];
    let commaSplit = ITU_PREFIX_TABLE[i].split(',');

    for (let commaValue of commaSplit) {
      let dashSplit = commaValue.split('-');
      if (dashSplit.length == 1) {
        newRow.push(dashSplit[0]);
      } else {
        switch (character) {
          case 90:
            newRange = 'A';
          default:
            newRange = String.fromCharCode(++c);
        }
      }
    }
  }
}

function callsign() {
  'use strict';
  if (cset == null)
    var cset = {};

  if (window.console == null)
    cset.debug = false;

  // Stop the script if there are no callsign tags in the document.
  if (document.getElementsByTagName('callsign').length == 0) {
    return;
  }

  expandTable();

  // Go through all callsign elements and apply flag and strike through zero.
  if (cset.flag == null || cset.flag || cset.zero == null || cset.zero) {
    let callsignElements = document.getElementsByTagName('callsign');
    for (let i = 0; i < callsignElements.length; i++) {
      if (cset.flag == null || cset.flag) {
        let prefix = CALLSIGN_REGEX.exec(callsignElements[i].innerHTML);
        if (cset.debug)
          console.log('Found callsign:', callsignElements[i].innerHTML);
        for (let row in ITU_PREFIX_TABLE) {
          if (row.includes(prefix)) {
            let flagElement = document.createElement('span');
            flagElement.setAttribute('class', 'callsign-flag');
            flagElement.setAttribute('title', row);
            flagElement.innerHTML = getFlag(row);
            callsignElements[i].parentNode.insertBefore(flagElement, callsignElements[i]);
            break;
          }
        }
      }

      if (cset.zero == null || cset.zero) {
        callsignElements[i].innerHTML = callsignElements[i].innerHTML.replace(/0/, '0\u0338');
      }
    }
  }
}

callsign();
