/**
 * Unit tests for the getPhonetics method
 * Tests the mapping of characters to their phonetic alphabet equivalents
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

describe('getPhonetics method', () => {
  test('should convert single letter to phonetic equivalent', () => {
    expect(getPhonetics('A')).toBe('Alfa');
    expect(getPhonetics('B')).toBe('Bravo');
    expect(getPhonetics('Z')).toBe('Zulu');
  });

  test('should convert single digit to phonetic equivalent', () => {
    expect(getPhonetics('0')).toBe('Ziro');
    expect(getPhonetics('1')).toBe('One');
    expect(getPhonetics('9')).toBe('Niner');
  });

  test('should convert typical call sign letters', () => {
    expect(getPhonetics('W1AW')).toBe('Whiskey One Alfa Whiskey');
    expect(getPhonetics('SM8AYA')).toBe('Sierra Mike Eight Alfa Yankee Alfa');
    expect(getPhonetics('DL1ABC')).toBe('Delta Lima One Alfa Bravo Charlie');
  });

  test('should handle mixed letters and numbers', () => {
    expect(getPhonetics('K2ABC')).toBe('Kilo Two Alfa Bravo Charlie');
    expect(getPhonetics('VE3XYZ')).toBe('Victor Echo Tree X-ray Yankee Zulu');
  });

  test('should return empty string for empty input', () => {
    expect(getPhonetics('')).toBe('');
  });

  test('should handle single character input', () => {
    expect(getPhonetics('X')).toBe('X-ray');
    expect(getPhonetics('3')).toBe('Tree');
  });

  test('should handle all letters A-Z correctly', () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const expected = [
      'Alfa', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot',
      'Golf', 'Hotel', 'India', 'Juliett', 'Kilo', 'Lima',
      'Mike', 'November', 'Oscar', 'Papa', 'Quebec', 'Romeo',
      'Sierra', 'Tango', 'Uniform', 'Victor', 'Whiskey',
      'X-ray', 'Yankee', 'Zulu'
    ].join(' ');
    
    expect(getPhonetics(alphabet)).toBe(expected);
  });

  test('should handle all digits 0-9 correctly', () => {
    const digits = '0123456789';
    const expected = [
      'Ziro', 'One', 'Two', 'Tree', 'Four', 'Five',
      'Six', 'Seven', 'Eight', 'Niner'
    ].join(' ');
    
    expect(getPhonetics(digits)).toBe(expected);
  });

  test('should handle characters not in phonetic table', () => {
    // Characters not in the table should result in undefined being added
    const result = getPhonetics('A/B');
    expect(result).toBe('Alfa undefined Bravo');
  });

  test('should handle typical amateur radio call signs', () => {
    expect(getPhonetics('KD8ABC')).toBe('Kilo Delta Eight Alfa Bravo Charlie');
    expect(getPhonetics('G0XYZ')).toBe('Golf Ziro X-ray Yankee Zulu');
    expect(getPhonetics('JA1ABC')).toBe('Juliett Alfa One Alfa Bravo Charlie');
  });
});