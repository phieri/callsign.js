/**
 * @file Highlight amateur radio call signs in web pages with this JavaScript library
 * @version 0.1.0
 * @author Philip Eriksson <www.philiperiksson.se>
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
function flag(code) {
  'use strict';
  return String.fromCodePoint(...[...code].map(c => c.charCodeAt() + 127397));
}

/**
 * Expand the letter intervals.
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
  if (cset.debug == null)
    cset.debug = true;

  if (window.console == null)
    cset.debug = false;

  if (cset.debug) {
    if (window.performance !== null) {
      performance.mark('cs-start');
    } else {
      console.error('Performance API n/a');
    }
  }

  expandTable();

  // Go through all callsign elements and apply flag and strike through zero
  if (cset.flag == null || cset.flag == true || cset.zero == null || cset.zero) {
    let callsignElements = document.getElementsByTagName('callsign');
    for (let i = 0; i < callsignElements.length; i++) {
      if (cset.flag == null || cset.flag == true) {
        let prefix = CALLSIGN_REGEX.exec(callsignElements[i].innerHTML);
        if (cset.debug)
          console.log('Found callsign:', callsignElements[i].innerHTML);
        for (let row in ITU_PREFIX_TABLE) {
          if (row.includes(prefix)) {
            let flagElement = document.createElement('span');
            flagElement.setAttribute('class', 'callsign-flag');
            flagElement.setAttribute('title', row);
            flagElement.innerHTML = flag(row);
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

  if (cset.debug) {
    if (window.performance != null) {
      performance.mark('cs-done');
      performance.measure('callsign', 'cs-start', 'cs-done');
      let measures = performance.getEntriesByName('callsign');
      let measure = measures[0];
      console.log('callsign.js exec took', measure.duration);
      performance.clearMarks();
      performance.clearMeasures();
    }
  }
}

callsign();
