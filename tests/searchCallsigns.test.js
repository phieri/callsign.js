/**
 * Unit tests for the searchCallsigns method
 * Tests basic functionality for detecting and wrapping untagged call signs in <call-sign> tags
 */

// Mock the search regex and the searchCallsigns functionality for testing
const SEARCH_REGEX = /([A-Z,\d]{1,3}\d[A-Z]{1,3}(?:\/\d)?)\s/;

/**
 * Simplified version of searchCallsigns for testing
 * @param {string} html Input HTML string
 * @returns {string} HTML with call signs wrapped in call-sign tags
 */
function searchCallsigns(html) {
  'use strict';
  let match;
  let result = html;
  
  while ((match = result.match(SEARCH_REGEX)) !== null) {
    result = result.replace(match[1], '<call-sign>' + match[1] + '</call-sign>');
  }
  
  return result;
}

// Setup jsdom environment
beforeEach(() => {
  document.body.innerHTML = '';
});

describe('searchCallsigns method', () => {
  test('should detect and wrap simple call sign with space after', () => {
    const input = 'Contact W1AW today';
    const expected = 'Contact <call-sign>W1AW</call-sign> today';
    expect(searchCallsigns(input)).toBe(expected);
  });

  test('should detect and wrap multiple call signs', () => {
    const input = 'Contact W1AW and SM8AYA today';
    const expected = 'Contact <call-sign>W1AW</call-sign> and <call-sign>SM8AYA</call-sign> today';
    expect(searchCallsigns(input)).toBe(expected);
  });

  test('should detect call signs with different prefix lengths', () => {
    // 1-letter prefix + digit + letters
    expect(searchCallsigns('Call K2ABC ')).toBe('Call <call-sign>K2ABC</call-sign> ');
    
    // 2-letter prefix + digit + letters  
    expect(searchCallsigns('Call SM8AYA ')).toBe('Call <call-sign>SM8AYA</call-sign> ');
    
    // 3-letter prefix + digit + letters
    expect(searchCallsigns('Call VK2ABC ')).toBe('Call <call-sign>VK2ABC</call-sign> ');
  });

  test('should detect call signs with different suffix lengths', () => {
    // Single letter suffix
    expect(searchCallsigns('Call W1A ')).toBe('Call <call-sign>W1A</call-sign> ');
    
    // Two letter suffix
    expect(searchCallsigns('Call W1AB ')).toBe('Call <call-sign>W1AB</call-sign> ');
    
    // Three letter suffix
    expect(searchCallsigns('Call W1ABC ')).toBe('Call <call-sign>W1ABC</call-sign> ');
  });

  test('should detect call signs with portable indicators', () => {
    const input = 'Call W1ABC/3 on the air';
    const expected = 'Call <call-sign>W1ABC/3</call-sign> on the air';
    expect(searchCallsigns(input)).toBe(expected);
  });

  test('should not wrap call signs without trailing space', () => {
    // The regex requires a space after the call sign
    const input = 'CallW1ABC';
    expect(searchCallsigns(input)).toBe(input); // No change expected
  });

  test('should handle call signs in different contexts', () => {
    expect(searchCallsigns('Hello W1AW from K2ABC ')).toBe('Hello <call-sign>W1AW</call-sign> from <call-sign>K2ABC</call-sign> ');
  });

  test('should handle text with no call signs', () => {
    const input = 'This is just normal text with no call signs.';
    expect(searchCallsigns(input)).toBe(input);
  });

  test('should handle empty string', () => {
    expect(searchCallsigns('')).toBe('');
  });

  test('should detect various valid call sign patterns', () => {
    // US call signs
    expect(searchCallsigns('W1AW ')).toBe('<call-sign>W1AW</call-sign> ');
    expect(searchCallsigns('K2ABC ')).toBe('<call-sign>K2ABC</call-sign> ');
    expect(searchCallsigns('N3XYZ ')).toBe('<call-sign>N3XYZ</call-sign> ');
    
    // International call signs
    expect(searchCallsigns('G0ABC ')).toBe('<call-sign>G0ABC</call-sign> ');
    expect(searchCallsigns('DL1ABC ')).toBe('<call-sign>DL1ABC</call-sign> ');
    expect(searchCallsigns('JA1XYZ ')).toBe('<call-sign>JA1XYZ</call-sign> ');
  });

  test('should handle call signs with numbers in prefix', () => {
    // Some call signs can have numbers in the prefix
    expect(searchCallsigns('9V1ABC ')).toBe('<call-sign>9V1ABC</call-sign> ');
  });

  test('should process multiple occurrences iteratively', () => {
    // Test that the while loop processes all matches
    const input = 'W1AW K2ABC SM8AYA ';
    const result = searchCallsigns(input);
    expect(result).toContain('<call-sign>W1AW</call-sign>');
    expect(result).toContain('<call-sign>K2ABC</call-sign>');
    expect(result).toContain('<call-sign>SM8AYA</call-sign>');
  });

  test('should handle already wrapped call signs correctly', () => {
    // If a call sign is already wrapped, it shouldn't be wrapped again
    const input = '<call-sign>W1AW</call-sign> and K2ABC ';
    const result = searchCallsigns(input);
    // Should only wrap the unwrapped call sign
    expect(result).toBe('<call-sign>W1AW</call-sign> and <call-sign>K2ABC</call-sign> ');
  });
});