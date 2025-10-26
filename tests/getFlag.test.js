/**
 * Unit tests for the getFlag method
 * Validates the conversion of ISO country codes extracted by PREFIX_TABLE regex matching
 * to Unicode Regional Indicator Symbols (emoji flags)
 */

/**
 * Converts an ISO country code to a Unicode Regional Indicator Symbol (emoji flag).
 * @param {!string} code The ISO 3166-1 alpha-2 code
 * @returns {string}
 */
function getFlag(code) {
  'use strict';
  return String.fromCodePoint(...[...code].map(c => c.charCodeAt() + 127397));
}

describe('getFlag method - ISO code to emoji conversion', () => {
  test('should correctly convert common country codes from PREFIX_TABLE', () => {
    // Test codes that would be matched from PREFIX_TABLE after regex parsing
    expect(getFlag('US')).toBe(String.fromCodePoint(127482, 127480)); // 🇺🇸
    expect(getFlag('SE')).toBe(String.fromCodePoint(127480, 127466)); // 🇸🇪
    expect(getFlag('DE')).toBe(String.fromCodePoint(127465, 127466)); // 🇩🇪
    expect(getFlag('GB')).toBe(String.fromCodePoint(127468, 127463)); // 🇬🇧
    expect(getFlag('JP')).toBe(String.fromCodePoint(127471, 127477)); // 🇯🇵
    expect(getFlag('CA')).toBe(String.fromCodePoint(127464, 127462)); // 🇨🇦
  });

  test('should apply correct mathematical transformation (charCode + 127397)', () => {
    // A = 65, 65 + 127397 = 127462 (Regional Indicator A)
    // Z = 90, 90 + 127397 = 127487 (Regional Indicator Z)
    expect(getFlag('AA')).toBe(String.fromCodePoint(127462, 127462));
    expect(getFlag('ZZ')).toBe(String.fromCodePoint(127487, 127487));
  });

  test('should handle all ISO codes from PREFIX_TABLE entries', () => {
    // Test a sample of codes that appear in the PREFIX_TABLE
    const prefixCodes = ['AU', 'BR', 'FR', 'IT', 'MX', 'ES', 'CN', 'IN'];
    prefixCodes.forEach(code => {
      const result = getFlag(code);
      expect(result).toBeTruthy();
      expect(result.length).toBe(4); // Each emoji flag is 2 code points (4 bytes in UTF-16)
    });
  });
});