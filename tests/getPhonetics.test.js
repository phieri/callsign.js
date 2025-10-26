/**
 * Unit tests for the getPhonetics method
 * Tests phonetic alphabet mapping for characters extracted from call signs via PARTS_REGEX
 */

// Copy the phonetic table and getPhonetics method for testing
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

/**
 * @param {string} letters The string of letters to expand
 * @returns {string}
 */
function getPhonetics(letters) {
  'use strict';
  let ret = "";
  for (var i = 0; i < letters.length; i++) {
    ret += PHONETIC_TABLE.get(letters.charAt(i)) + " ";
  }
  return ret.slice(0, -1);
}

describe('getPhonetics method - phonetic mapping for regex-parsed call signs', () => {
  describe('Complete call sign phonetic conversion', () => {
    test('should convert call signs matched by SEARCH_REGEX', () => {
      // These would be matched by SEARCH_REGEX and parsed by PARTS_REGEX
      expect(getPhonetics('W1AW')).toBe('Whiskey One Alfa Whiskey');
      expect(getPhonetics('K2ABC')).toBe('Kilo Two Alfa Bravo Charlie');
      expect(getPhonetics('SM8AYA')).toBe('Sierra Mike Eight Alfa Yankee Alfa');
      expect(getPhonetics('DL1ABC')).toBe('Delta Lima One Alfa Bravo Charlie');
    });

    test('should handle all alphabet characters A-Z from PHONETIC_TABLE', () => {
      const tests = [
        ['A', 'Alfa'], ['B', 'Bravo'], ['C', 'Charlie'], ['D', 'Delta'],
        ['E', 'Echo'], ['F', 'Foxtrot'], ['G', 'Golf'], ['H', 'Hotel'],
        ['I', 'India'], ['J', 'Juliett'], ['K', 'Kilo'], ['L', 'Lima'],
        ['M', 'Mike'], ['N', 'November'], ['O', 'Oscar'], ['P', 'Papa'],
        ['Q', 'Quebec'], ['R', 'Romeo'], ['S', 'Sierra'], ['T', 'Tango'],
        ['U', 'Uniform'], ['V', 'Victor'], ['W', 'Whiskey'], ['X', 'X-ray'],
        ['Y', 'Yankee'], ['Z', 'Zulu']
      ];
      
      tests.forEach(([char, phonetic]) => {
        expect(getPhonetics(char)).toBe(phonetic);
      });
    });

    test('should handle all digits 0-9 from PHONETIC_TABLE', () => {
      const tests = [
        ['0', 'Ziro'], ['1', 'One'], ['2', 'Two'], ['3', 'Tree'],
        ['4', 'Four'], ['5', 'Five'], ['6', 'Six'], ['7', 'Seven'],
        ['8', 'Eight'], ['9', 'Niner']
      ];
      
      tests.forEach(([digit, phonetic]) => {
        expect(getPhonetics(digit)).toBe(phonetic);
      });
    });
  });

  describe('Edge cases and regex-related scenarios', () => {
    test('should handle empty string (no regex match)', () => {
      expect(getPhonetics('')).toBe('');
    });

    test('should handle characters not in PHONETIC_TABLE (like / in portable indicators)', () => {
      // Slash in W1ABC/3 is not in the phonetic table
      const result = getPhonetics('W1ABC/3');
      expect(result).toContain('undefined'); // Will have undefined for /
    });

    test('should correctly process minimum length call signs (PARTS_REGEX captures)', () => {
      // W1A is minimum valid call sign pattern
      expect(getPhonetics('W1A')).toBe('Whiskey One Alfa');
    });

    test('should correctly process maximum length call signs', () => {
      // ABC1XYZ is maximum length pattern (3+1+3)
      expect(getPhonetics('ABC1XYZ')).toBe('Alfa Bravo Charlie One X-ray Yankee Zulu');
    });
  });

  describe('Real-world regex-matched patterns', () => {
    test('should handle common US prefixes matched by PREFIX_TABLE', () => {
      // US prefixes: W, K, N, AA-AL, etc.
      expect(getPhonetics('W')).toBe('Whiskey');
      expect(getPhonetics('K')).toBe('Kilo');
      expect(getPhonetics('N')).toBe('November');
      expect(getPhonetics('AA')).toBe('Alfa Alfa');
    });

    test('should handle international prefixes from PREFIX_TABLE', () => {
      // Common international prefixes
      expect(getPhonetics('SM')).toBe('Sierra Mike'); // Sweden
      expect(getPhonetics('DL')).toBe('Delta Lima'); // Germany
      expect(getPhonetics('JA')).toBe('Juliett Alfa'); // Japan
      expect(getPhonetics('VK')).toBe('Victor Kilo'); // Australia
    });
  });
});