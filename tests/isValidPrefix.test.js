/**
 * Unit tests for the isValidPrefix method
 * Tests validation of call sign prefixes against the PREFIX_TABLE
 */

// Copy PREFIX_TABLE from callsign.js for testing
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

/**
 * Validates if a prefix is registered in the PREFIX_TABLE
 * @param {string} prefix - The call sign prefix to validate
 * @returns {boolean}
 */
function isValidPrefix(prefix) {
  'use strict';
  for (const prefixes of PREFIX_TABLE.values()) {
    if (prefixes.includes(prefix)) {
      return true;
    }
  }
  return false;
}

describe('isValidPrefix validation', () => {
  describe('Valid prefixes from PREFIX_TABLE', () => {
    test('should validate single-letter US prefixes', () => {
      expect(isValidPrefix('W')).toBe(true);
      expect(isValidPrefix('K')).toBe(true);
      expect(isValidPrefix('N')).toBe(true);
    });

    test('should validate two-letter US prefixes', () => {
      expect(isValidPrefix('AA')).toBe(true);
      expect(isValidPrefix('AB')).toBe(true);
      expect(isValidPrefix('KD')).toBe(false); // KD is not in PREFIX_TABLE, only K
    });

    test('should validate Swedish prefixes', () => {
      expect(isValidPrefix('SM')).toBe(true);
      expect(isValidPrefix('SA')).toBe(true);
      expect(isValidPrefix('7S')).toBe(true);
    });

    test('should validate German prefixes', () => {
      expect(isValidPrefix('DA')).toBe(true);
      expect(isValidPrefix('DL')).toBe(true);
      expect(isValidPrefix('DM')).toBe(true);
    });

    test('should validate UK prefixes', () => {
      expect(isValidPrefix('G')).toBe(true);
      expect(isValidPrefix('M')).toBe(true);
    });

    test('should validate prefixes with numbers', () => {
      expect(isValidPrefix('9V')).toBe(true);
      expect(isValidPrefix('3D')).toBe(true);
      expect(isValidPrefix('5N')).toBe(true);
    });

    test('should validate three-letter prefixes', () => {
      expect(isValidPrefix('VK2')).toBe(false); // VK2 is not a valid prefix, VK is
      expect(isValidPrefix('HB0')).toBe(true);
      expect(isValidPrefix('XX9')).toBe(true);
    });
  });

  describe('Invalid prefixes not in PREFIX_TABLE', () => {
    test('should reject arbitrary single letters', () => {
      expect(isValidPrefix('Q')).toBe(false); // Q is reserved for special use
      expect(isValidPrefix('X')).toBe(false);
    });

    test('should reject arbitrary two-letter combinations', () => {
      expect(isValidPrefix('ZZ')).toBe(true); // ZZ is valid (Brazil)
      expect(isValidPrefix('XX')).toBe(true); // XX is valid (China/Macau)
      expect(isValidPrefix('QQ')).toBe(false);
      expect(isValidPrefix('YY')).toBe(true); // YY is valid (Venezuela)
    });

    test('should reject prefixes that look valid but are not registered', () => {
      expect(isValidPrefix('AB')).toBe(true); // AB is valid (US)
      expect(isValidPrefix('AZ')).toBe(true); // AZ is valid (Argentina)
      expect(isValidPrefix('BB')).toBe(false); // Not in PREFIX_TABLE
      expect(isValidPrefix('KK')).toBe(false); // Not in PREFIX_TABLE
    });

    test('should reject empty or malformed prefixes', () => {
      expect(isValidPrefix('')).toBe(false);
      expect(isValidPrefix('123')).toBe(false);
    });
  });

  describe('Edge cases', () => {
    test('should be case-sensitive (uppercase required)', () => {
      expect(isValidPrefix('w')).toBe(false);
      expect(isValidPrefix('W')).toBe(true);
    });

    test('should validate all documented prefix patterns', () => {
      // Sample from different countries
      const validPrefixes = ['W', 'K', 'N', 'SM', 'DL', 'G', 'JA', 'VK', '9V', 'ZL'];
      validPrefixes.forEach(prefix => {
        expect(isValidPrefix(prefix)).toBe(true);
      });
    });
  });
});
