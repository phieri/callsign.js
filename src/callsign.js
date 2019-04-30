/**
 * @file Highlight radio call signs (including amateur) in web pages with this JavaScript library.
 * @version 1.2.0
 * @author Philip Eriksson <https://www.philiperiksson.se>
 * @see {@link https://github.com/Lominean/callsign.js|Repository at GitHub}
 */

/** @constant */
const PREFIX_TABLE = {
  AF: ['YA', 'T6'],
  AL: ['ZA'],
  AR: ['AY', 'AZ', 'LO', 'LP', 'LQ', 'LR', 'LS', 'LT', 'LU', 'LV', 'LW'],
  AT: ['OE'],
  AU: ['AX', 'VH', 'VI', 'VJ', 'VK', 'VN', 'VZ'],
  BG: ['LZ'],
  BR: ['PP', 'PQ', 'PR', 'PS', 'PT', 'PU', 'PV', 'PW', 'PX', 'PY', 'ZV', 'ZW', 'ZX', 'ZY', 'ZZ'],
  CA: ['CF', 'CG', 'CH', 'CI', 'CJ', 'CK', 'CY', 'CZ', 'VA', 'VB', 'VC', 'VD', 'VE', 'VF', 'VG', 'VO', 'VX', 'VY', 'XJ', 'XK', 'XL', 'XM', 'XN', 'XO'],
  CF: ['TL'],
  CH: ['HB', 'HE'],
  CI: ['TU'],
  CL: ['CA', 'CB', 'CC', 'CD', 'CE', 'XQ', 'XR', '3G'],
  CM: ['TJ'],
  CN: ['B', 'VR', 'XS', 'XX'],
  CR: ['TE', 'TI'],
  DE: ['DA', 'DB', 'DC', 'DD', 'DE', 'DF', 'DG', 'DH', 'DI', 'DJ', 'DK', 'DL', 'DM', 'DN', 'DO', 'DP', 'DQ', 'DR'],
  DK: ['OU', 'OV', 'OW', 'OX', 'OY', 'OZ', 'XP'],
  EE: ['ES'],
  ES: ['AM', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'EA', 'EB', 'EC', 'ED', 'EE', 'EF', 'EG', 'EH'],
  FI: ['OF', 'OG', 'OH', 'OI', 'OJ'],
  FR: ['F', 'HW', 'HX', 'HY'],
  GA: ['TR'],
  GB: ['G', 'M', 'VP', 'VQ', 'VS', 'ZB-ZJ', 'ZN', 'ZO', 'ZQ'],
  GT: ['TD', 'TG'],
  GQ: ['3C'],
  HN: ['HQ', 'HR'],
  HT: ['4V', 'HH'],
  HU: ['HA', 'HG'],
  ID: ['AT', 'AU', 'AV', 'AW', 'VT', 'VU', 'VV', 'VW'],
  IL: ['4X', '4Z'],
  IQ: ['HN', 'YI'],
  IS: ['TF'],
  IT: ['I'],
  JP: ['JA', 'JB', 'JC', 'JD', 'JE', 'JF', 'JG', 'JH', 'JI', 'JJ', 'JK', 'JL', 'JM', 'JN', 'JO', 'JP', 'JQ', 'JR', 'JS'],
  KP: ['HM', 'P5', 'P6', 'P7', 'P8', 'P9'],
  KR: ['DS', 'DT', 'HL'],
  LT: ['LY'],
  LV: ['YL'],
  MC: ['3A'],
  ML: ['TZ'],
  MM: ['XY', 'XZ'],
  MU: ['3B'],
  NI: ['H6', 'H7', 'HT'],
  NL: ['PA', 'PB', 'PC', 'PD', 'PE', 'PF', 'PG', 'PH', 'PI', 'PJ'],
  NO: ['L', 'LB', 'LC', 'LD', 'LE', 'LF', 'LG', 'LH', 'LI', 'LJ', 'LK', 'LL', 'LM', 'LN'],
  NZ: ['ZK', 'ZL', 'ZM'],
  PK: ['AP', 'AQ', 'AR', 'AS', '6P', '6Q', '6R', '6S'],
  PL: ['HF', 'SN', 'SO', 'SP', 'SQ', 'SR', '3Z'],
  PY: ['ZP'],
  RO: ['YO', 'YP', 'YQ', 'YR'],
  RS: ['YT', 'YU'],
  RU: ['R', 'UA', 'UB', 'UC', 'UD', 'UE', 'UF', 'UG', 'UH', 'UI'],
  SE: ['SA', 'SB', 'SC', 'SD', 'SE', 'SF', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', '7S'],
  SK: ['OM'],
  SV: ['HU', 'YS'],
  TD: ['TT'],
  TH: ['HS'],
  TR: ['TA', 'TB', 'TC', 'YM'],
  UA: ['EM', 'EN', 'EO', 'UR', 'US', 'UT', 'UU', 'UV', 'UW', 'UX', 'UY', 'UZ'],
  US: ['AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'K', 'N', 'W'],
  VA: ['HV'],
  VE: ['4M', 'YV', 'YW', 'YX', 'YY'],
  VU: ['YJ'],
  YE: ['7O'],
  ZA: ['ZR', 'ZS', 'ZT', 'ZU'],
};

/** @constant */
const CALLSIGN_REGEX = /(([A-Z,\d]{1,3})(\d)([A-Z]{1,3})\/?(\d)?)\s/;

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


function search_callsigns() {
  'use strict';
  var html = document.body.innerHTML;
  var match;

  while (match = html.match(CALLSIGN_REGEX)) {
    html = html.replace(match[1], '<call-sign>' + match[1] + '</call-sign>');
  }

  document.body.innerHTML = html;
}

if (document.getElementById('callsign-js').dataset.search != 'false') {
  search_callsigns();
}

var callsign = new Callsign();
callsign = null;
