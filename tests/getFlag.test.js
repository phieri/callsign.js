/**
 * Unit tests for the getFlag method
 * Validates the conversion of ISO country codes extracted by PREFIX_TABLE regex matching
 * to Unicode Regional Indicator Symbols (emoji flags)
 */

import '../src/callsign.js';

const { Callsign } = window;

describe('getFlag method - ISO code to emoji conversion', () => {
  test('should correctly convert common country codes from PREFIX_TABLE', () => {
    // Test codes that would be matched from PREFIX_TABLE after regex parsing
    expect(Callsign.getFlag('US')).toBe('🇺🇸');
    expect(Callsign.getFlag('SE')).toBe('🇸🇪');
    expect(Callsign.getFlag('DE')).toBe('🇩🇪');
    expect(Callsign.getFlag('GB')).toBe('🇬🇧');
    expect(Callsign.getFlag('JP')).toBe('🇯🇵');
    expect(Callsign.getFlag('CA')).toBe('🇨🇦');
  });

  test('should apply correct mathematical transformation (charCode + 127397)', () => {
    // A = 65, 65 + 127397 = 127462 (Regional Indicator A)
    // Z = 90, 90 + 127397 = 127487 (Regional Indicator Z)
    expect(Callsign.getFlag('AA')).toBe(String.fromCodePoint(127462, 127462));
    expect(Callsign.getFlag('ZZ')).toBe(String.fromCodePoint(127487, 127487));
  });

  test('should handle all ISO codes from PREFIX_TABLE entries', () => {
    // Test a sample of codes that appear in the PREFIX_TABLE
    const prefixCodes = ['AU', 'BR', 'FR', 'IT', 'MX', 'ES', 'CN', 'IN'];
    prefixCodes.forEach(code => {
      const result = Callsign.getFlag(code);
      expect(result).toBeTruthy();
      expect(result.length).toBe(4); // Two code points, four UTF-16 code units.
    });
  });
});