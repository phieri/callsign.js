/**
 * @file Highlight radio call signs (including amateur) in web pages with this JavaScript library.
 * @version 1.2.1
 * @author Philip Eriksson <https://www.philiperiksson.se>
 * @see {@link https://github.com/phieri/callsign.js|Repository at GitHub}
 */

/** @constant */
const PHONETIC_TABLE = new Map([
  ['A', 'Alfa'],
  ['B', 'Bravo'],
  ['C', 'Charlie'],
  ['D', 'Delta'],
  ['E', 'Echo'],
  ['F', 'Foxtrot'],
  ['G', 'Golf'],
  ['H', 'Hotel'],
  ['I', 'India'],
  ['J', 'Juliett'],
  ['K', 'Kilo'],
  ['L', 'Lima'],
  ['M', 'Mike'],
  ['N', 'November'],
  ['O', 'Oscar'],
  ['P', 'Papa'],
  ['Q', 'Quebec'],
  ['R', 'Romeo'],
  ['S', 'Sierra'],
  ['T', 'Tango'],
  ['U', 'Uniform'],
  ['V', 'Victor'],
  ['W', 'Whiskey'],
  ['X', 'X-ray'],
  ['Y', 'Yankee'],
  ['Z', 'Zulu'],
  ['0', 'Ziro'],
  ['1', 'One'],
  ['2', 'Two'],
  ['3', 'Tree'],
  ['4', 'Four'],
  ['5', 'Five'],
  ['6', 'Six'],
  ['7', 'Seven'],
  ['8', 'Eight'],
  ['9', 'Niner'],
]);

/** @constant */
const PREFIX_TABLE = new Map([
  ['AD', ['C3']],
  ['AE', ['A6']],
  ['AF', ['YA', 'T6']],
  ['AG', ['V2']],
  ['AL', ['ZA']],
  ['AO', ['D2', 'D3']],
  ['AR', ['AY', 'AZ', 'LO', 'LP', 'LQ', 'LR', 'LS', 'LT', 'LU', 'LV', 'LW']],
  ['AT', ['OE']],
  ['AU', ['AX', 'VH', 'VI', 'VJ', 'VK', 'VN', 'VZ']],
  ['BA', ['E7', 'T9']],
  ['BB', ['8P']],
  ['BD', ['S2', 'S3']],
  ['BE', ['ON', 'OO', 'OP', 'OQ', 'OR', 'OS', 'OT']],
  ['BF', ['XT']],
  ['BG', ['LZ']],
  ['BH', ['A9']],
  ['BO', ['CP']],
  ['BR', ['PP', 'PQ', 'PR', 'PS', 'PT', 'PU', 'PV', 'PW', 'PX', 'PY', 'ZV', 'ZW', 'ZX', 'ZY', 'ZZ']],
  ['BS', ['C6']],
  ['BT', ['A5']],
  ['BW', ['A2']],
  ['BY', ['EU', 'EV', 'EW']],
  ['BZ', ['V3']],
  ['CA', ['CF', 'CG', 'CH', 'CI', 'CJ', 'CK', 'CY', 'CZ', 'VA', 'VB', 'VC', 'VD', 'VE', 'VF', 'VG', 'VO', 'VX', 'VY', 'XJ', 'XK', 'XL', 'XM', 'XN', 'XO']],
  ['CD', ['9Q']],
  ['CF', ['TL']],
  ['CG', ['TN']],
  ['CH', ['HB', 'HE']],
  ['CI', ['TU']],
  ['CL', ['CA', 'CB', 'CC', 'CD', 'CE', 'XQ', 'XR', '3G']],
  ['CM', ['TJ']],
  ['CN', ['B', 'VR', 'XS', 'XX']],
  ['CO', ['HJ', 'HK', '5J', '5K']],
  ['CR', ['TE', 'TI']],
  ['CU', ['CM', 'CO', 'T4']],
  ['CY', ['5B', 'C4', 'H2', 'P3']],
  ['CZ', ['OK', 'OL']],
  ['DE', ['DA', 'DB', 'DC', 'DD', 'DE', 'DF', 'DG', 'DH', 'DI', 'DJ', 'DK', 'DL', 'DM', 'DN', 'DO', 'DP', 'DQ', 'DR']],
  ['DK', ['OU', 'OV', 'OW', 'OX', 'OY', 'OZ', 'XP']],
  ['DM', ['J7']],
  ['DO', ['HI']],
  ['DZ', ['7X']],
  ['EC', ['HC', 'HD', '5X']],
  ['EE', ['ES']],
  ['EG', ['SU']],
  ['ES', ['AM', 'AN', 'AO', 'EA', 'EB', 'EC', 'ED', 'EE', 'EF', 'EG', 'EH']],
  ['ET', ['ET']],
  ['FI', ['OF', 'OG', 'OH', 'OI', 'OJ']],
  ['FR', ['F', 'HW', 'HX', 'HY', 'TH', 'TM', 'TN', 'TO', 'TP', 'TQ', 'TR', 'TS', 'TT', 'TU', 'TV', 'TW', 'TX', 'TY', 'TZ']],
  ['GA', ['TR']],
  ['GB', ['G', 'M', 'VP', 'VQ', 'VS', 'ZB', 'ZC', 'ZD', 'ZE', 'ZF', 'ZG', 'ZH', 'ZI', 'ZJ', 'ZN', 'ZO', 'ZQ']],
  ['GD', ['J3']],
  ['GF', ['FY']],
  ['GH', ['9G']],
  ['GQ', ['3C']],
  ['GR', ['J4', 'SV', 'SW', 'SX', 'SY', 'SZ']],
  ['GT', ['TD', 'TG']],
  ['GY', ['8R']],
  ['HK', ['VR']],
  ['HN', ['HQ', 'HR']],
  ['HR', ['9A']],
  ['HT', ['4V', 'HH']],
  ['HU', ['HA', 'HG']],
  ['ID', ['YB', 'YC', 'YD', 'YE', 'YF', 'YG', 'YH', '7A', '7B', '7C', '7D', '7E', '7F', '7G', '7H', '7I', '8A', '8B', '8C', '8D', '8E', '8F', '8G', '8H', '8I']],
  ['IE', ['EI', 'EJ']],
  ['IL', ['4X', '4Z']],
  ['IN', ['AT', 'AU', 'AV', 'AW', 'VT', 'VU', 'VV', 'VW']],
  ['IQ', ['HN', 'YI']],
  ['IR', ['EP', 'EQ']],
  ['IS', ['TF']],
  ['IT', ['I', 'IZ']],
  ['JM', ['6Y']],
  ['JO', ['JY']],
  ['JP', ['JA', 'JB', 'JC', 'JD', 'JE', 'JF', 'JG', 'JH', 'JI', 'JJ', 'JK', 'JL', 'JM', 'JN', 'JO', 'JP', 'JQ', 'JR', 'JS']],
  ['KE', ['5Z']],
  ['KH', ['XU']],
  ['KN', ['V4']],
  ['KP', ['HM', 'P5', 'P6', 'P7', 'P8', 'P9']],
  ['KR', ['DS', 'DT', 'HL']],
  ['KW', ['9K']],
  ['LA', ['XW']],
  ['LB', ['OD']],
  ['LC', ['J6']],
  ['LI', ['HB0']],
  ['LK', ['4P', '4Q', '4R', '4S']],
  ['LS', ['7P']],
  ['LT', ['LY']],
  ['LU', ['LX']],
  ['LV', ['YL']],
  ['LY', ['5A']],
  ['MA', ['CN']],
  ['MC', ['3A']],
  ['MD', ['ER']],
  ['ME', ['4O']],
  ['MG', ['5R', '5S']],
  ['MK', ['Z3']],
  ['ML', ['TZ']],
  ['MM', ['XY', 'XZ']],
  ['MN', ['JT', 'JU', 'JV']],
  ['MO', ['XX9']],
  ['MT', ['9H']],
  ['MU', ['3B']],
  ['MW', ['7Q']],
  ['MX', ['XA', 'XB', 'XC', 'XD', 'XE', 'XF', 'XG', 'XH', 'XI', 'XJ', 'XK', 'XL', 'XM', 'XN', 'XO', '4A', '4B', '4C', '6D', '6E', '6F', '6G', '6H', '6I', '6J']],
  ['MY', ['9M']],
  ['MZ', ['C9']],
  ['NA', ['V5']],
  ['NE', ['5U']],
  ['NG', ['5N']],
  ['NI', ['H6', 'H7', 'HT']],
  ['NL', ['PA', 'PB', 'PC', 'PD', 'PE', 'PF', 'PG', 'PH', 'PI', 'PJ']],
  ['NO', ['LA', 'LB', 'LC', 'LD', 'LE', 'LF', 'LG', 'LH', 'LI', 'LJ', 'LK', 'LL', 'LM', 'LN']],
  ['NP', ['9N']],
  ['NZ', ['ZK', 'ZL', 'ZM']],
  ['OM', ['A4']],
  ['PA', ['HO', 'HP', '3E', '3F']],
  ['PE', ['OA', 'OB', 'OC', '4T']],
  ['PH', ['DU', 'DV', 'DW', 'DX', 'DY', 'DZ', '4D', '4E', '4F', '4G', '4H', '4I']],
  ['PK', ['AP', 'AQ', 'AR', 'AS', '6P', '6Q', '6R', '6S']],
  ['PL', ['HF', 'SN', 'SO', 'SP', 'SQ', 'SR', '3Z']],
  ['PR', ['KP', 'NP', 'WP']],
  ['PT', ['CR', 'CS', 'CT', 'CU']],
  ['PY', ['ZP']],
  ['QA', ['A7']],
  ['RE', ['FR']],
  ['RO', ['YO', 'YP', 'YQ', 'YR']],
  ['RS', ['YT', 'YU']],
  ['RU', ['R', 'UA', 'UB', 'UC', 'UD', 'UE', 'UF', 'UG', 'UH', 'UI']],
  ['SA', ['HZ', '7Z', '8Z']],
  ['SC', ['S7', 'S79']],
  ['SE', ['SA', 'SB', 'SC', 'SD', 'SE', 'SF', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', '7S']],
  ['SG', ['9V']],
  ['SI', ['S5']],
  ['SK', ['OM']],
  ['SM', ['T7']],
  ['SN', ['6V', '6W']],
  ['SR', ['PZ']],
  ['SV', ['HU', 'YS']],
  ['SY', ['YK']],
  ['SZ', ['3D']],
  ['TD', ['TT']],
  ['TH', ['HS']],
  ['TN', ['3V']],
  ['TR', ['TA', 'TB', 'TC', 'YM']],
  ['TT', ['9Y', '9Z']],
  ['TW', ['BM', 'BN', 'BO', 'BP', 'BQ', 'BU', 'BV', 'BW', 'BX']],
  ['TZ', ['5H', '5I']],
  ['UA', ['EM', 'EN', 'EO', 'UR', 'US', 'UT', 'UU', 'UV', 'UW', 'UX', 'UY', 'UZ']],
  ['UG', ['5X']],
  ['US', ['AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'K', 'N', 'W']],
  ['UY', ['CV', 'CW', 'CX']],
  ['VA', ['HV']],
  ['VC', ['J8']],
  ['VE', ['4M', 'YV', 'YW', 'YX', 'YY']],
  ['VN', ['3W', 'XV']],
  ['VU', ['YJ']],
  ['YE', ['7O']],
  ['ZA', ['ZR', 'ZS', 'ZT', 'ZU']],
  ['ZM', ['9J']],
  ['ZW', ['Z2']],
]);

/** @constant */
const SEARCH_REGEX = /([A-Z,\d]{1,3}\d[A-Z]{1,3}(?:\/\d)?)\s/;

/** @constant */
const PARTS_REGEX = /([A-Z,\d]{1,3})(\d)([A-Z]{1,3})(?:\/(\d))?/;

/** @constant */
const DEFAULT_CSS_PATH = 'callsign.css';

// Cache script element and configuration
let scriptElement = null;
let config = null;

/**
 * Gets the script element and caches it
 * @returns {HTMLScriptElement|null}
 */
function getScriptElement() {
  if (!scriptElement) {
    scriptElement = document.getElementById('callsign-js');
  }
  return scriptElement;
}

/**
 * Gets configuration from script element dataset
 * @returns {Object}
 */
function getConfig() {
  if (!config) {
    const script = getScriptElement();
    if (!script) {
      console.warn('callsign.js: Script element with id="callsign-js" not found');
      return {
        flag: 'true',
        monospace: 'true',
        phonetic: 'true',
        search: 'false',
        cssPath: DEFAULT_CSS_PATH
      };
    }
    config = {
      flag: script.dataset.flag || 'true',
      monospace: script.dataset.monospace || 'true',
      phonetic: script.dataset.phonetic || 'true',
      search: script.dataset.search || 'false',
      cssPath: script.dataset.cssPath || DEFAULT_CSS_PATH
    };
  }
  return config;
}

/**
 * Custom element for rendering radio call signs with country flags and phonetic information
 * @extends HTMLElement
 */
class Callsign extends HTMLElement {
  constructor() {
    super();

    const configuration = getConfig();
    const callsignText = this.innerHTML.trim();
    
    // Validate call sign format
    const match = callsignText.match(PARTS_REGEX);
    if (!match) {
      console.warn(`callsign.js: Invalid call sign format: ${callsignText}`);
      return;
    }

    const shadow = this.attachShadow({
      mode: 'open'
    });

    const wrapper = document.createElement('span');
    wrapper.classList.add('cs-wrapper');
    if (configuration.monospace !== 'false') {
      wrapper.classList.add('monospace');
    }

    const parts = new Map([
      ['prefix', match[1]],
      ['digit', match[2]],
      ['suffix', match[3]],
    ]);

    // Add phonetic information
    if (configuration.phonetic !== 'false') {
      const phonetic = Callsign.getPhonetics(match[0]);
      wrapper.setAttribute('aria-label', phonetic);
      wrapper.setAttribute('title', phonetic);
    }

    // Add country flag
    if (configuration.flag !== 'false') {
      const flagElement = this.createFlagElement(parts.get('prefix'));
      if (flagElement) {
        wrapper.appendChild(flagElement);
      }
    }

    // Add call sign parts
    for (const [key, value] of parts) {
      const partElement = document.createElement('span');
      partElement.textContent = value;
      partElement.className = 'cs-' + key;
      if (configuration.phonetic !== 'false') {
        partElement.setAttribute('aria-hidden', 'true');
      }
      wrapper.appendChild(partElement);
    }

    // Add stylesheet
    const linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('href', configuration.cssPath);
    shadow.appendChild(linkElement);

    shadow.appendChild(wrapper);
  }

  /**
   * Creates a flag element for the given prefix
   * @param {string} prefix - The call sign prefix
   * @returns {HTMLSpanElement|null}
   */
  createFlagElement(prefix) {
    for (const [iso, prefixes] of PREFIX_TABLE) {
      if (prefixes.includes(prefix)) {
        const flagElement = document.createElement('span');
        flagElement.className = 'cs-flag';
        flagElement.title = iso;
        flagElement.textContent = Callsign.getFlag(iso);
        return flagElement;
      }
    }
    return null;
  }

  /**
   * Converts an ISO country code to a Unicode Regional Indicator Symbol (emoji flag).
   * @param {!string} code The ISO 3166-1 alpha-2 code
   * @returns {string}
   */
  static getFlag(code) {
    return String.fromCodePoint(...[...code].map(c => c.charCodeAt() + 127397));
  }

  /**
   * @param {string} letters The string of letters to expand
   * @returns {string}
   */
  static getPhonetics(letters) {
    let ret = "";
    for (let i = 0; i < letters.length; i++) {
      const phonetic = PHONETIC_TABLE.get(letters.charAt(i));
      if (phonetic) {
        ret += phonetic + " ";
      }
    }
    return ret.slice(0, -1);
  }

  /**
   * Goes through the entire webpage and adds markup to untagged call signs.
   * Uses TreeWalker to safely traverse text nodes without modifying innerHTML.
   */
  static searchCallsigns() {
    // Create a TreeWalker to find all text nodes
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          // Skip script and style elements
          const parent = node.parentElement;
          if (!parent || parent.tagName === 'SCRIPT' || 
              parent.tagName === 'STYLE' || 
              parent.tagName === 'CALL-SIGN') {
            return NodeFilter.FILTER_REJECT;
          }
          // Only accept nodes with potential call signs
          if (SEARCH_REGEX.test(node.textContent)) {
            return NodeFilter.FILTER_ACCEPT;
          }
          return NodeFilter.FILTER_REJECT;
        }
      }
    );

    const nodesToReplace = [];
    let currentNode;

    // Collect nodes to replace (can't modify while walking)
    while ((currentNode = walker.nextNode())) {
      nodesToReplace.push(currentNode);
    }

    // Process each text node
    for (const node of nodesToReplace) {
      const text = node.textContent;
      const matches = [];
      let match;
      let lastIndex = 0;
      const regex = new RegExp(SEARCH_REGEX, 'g');

      while ((match = regex.exec(text + ' ')) !== null) {
        matches.push({
          callsign: match[1],
          index: match.index,
          length: match[1].length
        });
      }

      if (matches.length > 0) {
        const parent = node.parentNode;
        const fragment = document.createDocumentFragment();
        lastIndex = 0;

        for (const matchInfo of matches) {
          // Add text before the call sign
          if (matchInfo.index > lastIndex) {
            fragment.appendChild(
              document.createTextNode(text.substring(lastIndex, matchInfo.index))
            );
          }

          // Create call-sign element
          const callsignElement = document.createElement('call-sign');
          callsignElement.textContent = matchInfo.callsign;
          fragment.appendChild(callsignElement);

          lastIndex = matchInfo.index + matchInfo.length;
        }

        // Add remaining text
        if (lastIndex < text.length) {
          fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
        }

        parent.replaceChild(fragment, node);
      }
    }
  }
}

// Initialize when DOM is ready
if (getConfig().search !== 'false') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Callsign.searchCallsigns());
  } else {
    Callsign.searchCallsigns();
  }
}

customElements.define('call-sign', Callsign);
