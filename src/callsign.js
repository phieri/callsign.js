/**
 * @file Highlight radio call signs (including amateur) in web pages with this JavaScript library.
 * @version 1.2.0
 * @author Philip Eriksson <https://www.philiperiksson.se>
 * @see {@link https://github.com/Lominean/callsign.js|Repository at GitHub}
 */

/** @constant */
const PREFIX_TABLE = {
  AF: 'YA,T6',
  AL: 'ZA',
  AR: 'AY-AZ,LO-LW',
  AT: 'OE',
  AU: 'AX,VH-VN,VZ',
  BG: 'LZ',
  BR: 'PP-PY,ZV-ZZ',
  CA: 'CF-CK,CY-CZ,VA-VG,VO,VX-VY,XJ-XO',
  CF: 'TL',
  CH: 'HB,HE',
  CI: 'TU',
  CL: 'CA-CE,XQ-XR,3G',
  CM: 'TJ',
  CN: 'B,VR,XS,XX',
  CR: 'TE,TI',
  DE: 'DA-DR',
  DK: 'OU-OZ,XP',
  EE: 'ES',
  ES: 'AM-AO,EA-EH',
  FI: 'OF-OJ',
  FR: 'F,HW-HY',
  GA: 'TR',
  GB: 'G,M,VP-VQ,VS,ZB-ZJ,ZN-ZO,ZQ',
  GT: 'TD,TG',
  GQ: '3C',
  HN: 'HQ-HR',
  HT: '4V,HH',
  HU: 'HA,HG',
  ID: 'AT-AW,VT-VW',
  IL: '4X,4Z',
  IQ: 'HN,YI',
  IS: 'TF',
  IT: 'I',
  JP: 'JA-JS',
  KP: 'HM,P5-P9',
  KR: 'DS-DT,HL',
  LT: 'LY',
  LV: 'YL',
  MC: '3A',
  ML: 'TZ',
  MM: 'XY-XZ',
  MU: '3B',
  NI: 'H6-H7,HT',
  NL: 'PA-PI,PJ',
  NO: 'LA-LN',
  NZ: 'ZK-ZM',
  PK: 'AP-AS,6P-6S',
  PL: 'HF,SN-SR,3Z',
  PY: 'ZP',
  RO: 'YO-YR',
  RS: 'YT-YU',
  RU: 'R,UA-UI',
  SE: 'SA-SM,7S',
  SK: 'OM',
  SV: 'HU,YS',
  TD: 'TT',
  TH: 'HS',
  TR: 'TA-TC,YM',
  UA: 'EM-EO,UR-UZ',
  US: 'AA-AL,K,N,W',
  VA: 'HV',
  VE: '4M,YV-YY',
  VU: 'YJ',
  YE: '7O',
  ZA: 'ZR-ZU'
};

/** @constant */
const CALLSIGN_REGEX = /([A-Z,\d]{1,3})(\d)([A-Z]{1,3})\/?(\d)?/;

class Callsign {

  constructor() {
    Callsign.callsign();
  }

  /**
   * Converts an ISO 3166-1 alpha-2 code to a Unicode Regional Indicator Symbol (emoji flag).
   * @param {!string} code The ISO 3166-1 alpha-2 code
   * @returns {string}
   */
  static getFlag(code) {
    'use strict';
    return String.fromCodePoint(...[...code].map(c => c.charCodeAt() + 127397));
  }

  /**
   * Method for expanding a letter range.
   * @param {!string} start The first word of the range
   * @param {!string} end The last word of the range
   * @returns {string[]}
   * @see https://stackoverflow.com/questions/30685916/increment-a-string-with-letters
   */
  static expandRange(start, end) {
    'use strict';
    let range = [];
    let secondEndLetter = end.charAt(1);
    let current = start.charAt(1);

    while (current != secondEndLetter) {
      range.push(start.charAt(0) + current);
      current = String.fromCharCode(current.charCodeAt(0) + 1);
    }

    range.push(end);
    return range;
  }

  /**
   * Expand the prefix table.
   * @returns {string[]}
   */
  static getPrefixTable() {
    'use strict';
    let newTable = {};

    for (let [territory, data] of Object.entries(PREFIX_TABLE)) {
      let newRow = [];
      let commaSplit = data.split(',');

      if (commaSplit.length === 1) {
        let dashSplit = commaSplit[0].split('-');
        if (dashSplit.length === 1) {
          newRow.push(dashSplit[0]);
        } else {
          newRow = newRow.concat(Callsign.expandRange(dashSplit[0], dashSplit[1]));
        }
      } else {
        for (let commaValue of commaSplit) {
          let dashSplit = commaValue.split('-');
          if (dashSplit.length === 1) {
            newRow.push(dashSplit[0]);
          } else {
            newRow = newRow.concat(Callsign.expandRange(dashSplit[0], dashSplit[1]));
          }
        }
      }
      newTable[territory] = newRow;
    }
    return newTable;
  }

  static callsign() {
    'use strict';
    let el = document.head.querySelector("#callsign-js");

    let flag = true;
    if (el.dataset.flag == "false") {
      flag = false;
    }

    let zero = true;
    if (el.dataset.zero == "false") {
      zero = false;
    }

    // Go through all call-sign elements and apply flag and strike through zero.
    if (flag || zero) {
      let callsignElements = document.getElementsByTagName('call-sign');
      let callsignElementsLength = callsignElements.length;
      if (callsignElementsLength === 0) return;

      let prefixTable;
      if (flag) prefixTable = this.getPrefixTable();

      for (let i = 0; i < callsignElementsLength; i++) {
        if (flag) {
          let prefixFromElement = CALLSIGN_REGEX.exec(callsignElements[i].innerHTML)[1];
          for (let [iso, prefix] of Object.entries(prefixTable)) {
            if (prefix.includes(prefixFromElement)) {
              let flagElement = document.createElement('span');
              flagElement.className = 'call-sign-flag';
              flagElement.title = iso;
              flagElement.innerHTML = Callsign.getFlag(iso);
              callsignElements[i].parentNode.insertBefore(flagElement, callsignElements[i]);
              break;
            }
          }
        }

        if (zero) {
          callsignElements[i].innerHTML = callsignElements[i].innerHTML.replace(/0/, '0\u0338');
        }
      }
    }
  }
}

var callsign = new Callsign();
callsign = null;
