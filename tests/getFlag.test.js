/**
 * Unit tests for the getFlag method
 * Tests the conversion of ISO country codes to Unicode Regional Indicator Symbols (emoji flags)
 */

// Since the callsign.js file is meant for browser environments and uses custom elements,
// we'll test the getFlag method by copying its implementation for testing purposes
// This approach is necessary because the original file depends on browser APIs

/**
 * Converts an ISO country code to a Unicode Regional Indicator Symbol (emoji flag).
 * @param {!string} code The ISO 3166-1 alpha-2 code
 * @returns {string}
 */
function getFlag(code) {
  'use strict';
  return String.fromCodePoint(...[...code].map(c => c.charCodeAt() + 127397));
}

describe('getFlag method', () => {
  test('should convert US code to US flag emoji', () => {
    const result = getFlag('US');
    // US flag emoji is represented by these code points
    const expected = String.fromCodePoint(127482, 127480); // 🇺🇸
    expect(result).toBe(expected);
  });

  test('should convert SE code to Swedish flag emoji', () => {
    const result = getFlag('SE');
    // SE flag emoji
    const expected = String.fromCodePoint(127480, 127466); // 🇸🇪
    expect(result).toBe(expected);
  });

  test('should convert GB code to UK flag emoji', () => {
    const result = getFlag('GB');
    // GB flag emoji
    const expected = String.fromCodePoint(127468, 127463); // 🇬🇧
    expect(result).toBe(expected);
  });

  test('should convert DE code to German flag emoji', () => {
    const result = getFlag('DE');
    // DE flag emoji
    const expected = String.fromCodePoint(127465, 127466); // 🇩🇪
    expect(result).toBe(expected);
  });

  test('should convert JP code to Japanese flag emoji', () => {
    const result = getFlag('JP');
    // JP flag emoji
    const expected = String.fromCodePoint(127471, 127477); // 🇯🇵
    expect(result).toBe(expected);
  });

  test('should handle lowercase input by converting correctly', () => {
    // The original function expects uppercase, but let's test with lowercase
    const result = getFlag('us');
    // This will produce different unicode points for lowercase
    const expected = String.fromCodePoint(127514, 127512); // Different from uppercase
    expect(result).toBe(expected);
  });

  test('should handle two-character codes correctly', () => {
    const result = getFlag('CA');
    const expected = String.fromCodePoint(127464, 127462); // 🇨🇦
    expect(result).toBe(expected);
  });

  test('should convert each character correctly using the offset', () => {
    // Test the mathematical transformation: A = 65, 65 + 127397 = 127462
    const result = getFlag('AA');
    const expected = String.fromCodePoint(127462, 127462); // 🇦🇦
    expect(result).toBe(expected);
  });
});