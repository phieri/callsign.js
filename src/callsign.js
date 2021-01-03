/**
 * @file Highlight radio call signs (including amateur) in web pages with this JavaScript library.
 * @version 1.2.0
 * @author Philip Eriksson <https://www.philiperiksson.se>
 * @see {@link https://github.com/Lominean/callsign.js|Repository at GitHub}
 */

/** @constant */
const PHONETIC_ALPHABET = {
  A: 'Alfa',
  B: 'Bravo',
  C: 'Charlie',
  D: 'Delta',
  E: 'Echo',
  F: 'Foxtrot',
  G: 'Golf',
  H: 'Hotel',
  I: 'India',
  J: 'Juliett',
  K: 'Kilo',
  L: 'Lima',
  M: 'Mike',
  N: 'November',
  O: 'Oscar',
  P: 'Papa',
  Q: 'Quebec',
  R: 'Romeo',
  S: 'Sierra',
  T: 'Tango',
  U: 'Uniform',
  V: 'Victor',
  W: 'Whiskey',
  X: 'X-ray',
  Y: 'Yankee',
  Z: 'Zulu',
  '0': 'Ziro',
  '1': 'One',
  '2': 'Two',
  '3': 'Tree',
  '4': 'Four',
  '5': 'Fiver',
  '6': 'Six',
  '7': 'Seven',
  '8': 'Eight',
  '9': 'Niner',
};

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
const SEARCH_REGEX = /([A-Z,\d]{1,3}\d[A-Z]{1,3}(?:\/\d)?)\s/;

/** @constant */
const PARTS_REGEX = /([A-Z,\d]{1,3})(\d)([A-Z]{1,3})(?:\/(\d))?/;

class Callsign extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({
      mode: 'open'
    });

    const wrapper = document.createElement('span');
    if (document.getElementById('callsign-js').dataset.monospace != 'false') {
      wrapper.setAttribute('class', 'cs-wrapper monospace');
    } else {
      wrapper.setAttribute('class', 'cs-wrapper');
    }

    const match = this.innerHTML.match(PARTS_REGEX);
    const found = [];
    found['prefix'] = match[1];
    found['digit'] = match[2];
    found['suffix'] = match[3];

    wrapper.setAttribute("aria-label", Callsign.getPhonetics(match[0]));

    if (document.getElementById('callsign-js').dataset.flag != 'false') {
      const flagElement = document.createElement('span');

      for (let [iso, prefix] of Object.entries(PREFIX_TABLE)) {
        if (prefix.includes(found['prefix'])) {
          flagElement.className = 'cs-flag';
          flagElement.title = iso;
          flagElement.innerHTML = Callsign.getFlag(iso);
          this.parentNode.insertBefore(flagElement, this);
          wrapper.appendChild(flagElement);
          break;
        }
      }
    }

    Object.entries(found).forEach(function (part) {
      const newElement = document.createElement('span');
      newElement.textContent = part[1];
      newElement.className = 'cs-' + part[0];
      newElement.setAttribute('aria-hidden', 'true');
      wrapper.appendChild(newElement);
    })

    const linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('href', 'callsign.css');
    shadow.appendChild(linkElement);

    shadow.appendChild(wrapper);
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

  static getPhonetics(letters) {
    let ret = "";
    for (var i = 0; i < letters.length; i++) {
      ret += PHONETIC_ALPHABET[letters.charAt(i)] + " ";
    }
    return ret.slice(0, -1);
  }

  /**
   * Goes through the entire webpage and adds markup to untagged call signs.
   */
  static searchCallsigns() {
    'use strict';
    let html = document.body.innerHTML;
    let match;

    while ((match = html.match(SEARCH_REGEX)) !== null) {
      html = html.replace(match[1], '<call-sign>' + match[1] + '</call-sign>');
    }

    document.body.innerHTML = html;
  }
}

if (document.getElementById('callsign-js').dataset.search != 'false') {
  Callsign.searchCallsigns();
}

customElements.define('call-sign', Callsign);
