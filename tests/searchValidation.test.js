/**
 * Integration tests for searchCallsigns with prefix validation
 * Tests that the search function only marks up call signs with valid prefixes
 */

// Copy PREFIX_TABLE and regex patterns from callsign.js for testing
const PREFIX_TABLE = new Map([
  ['US', ['AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'K', 'N', 'W']],
  ['SE', ['SA', 'SB', 'SC', 'SD', 'SE', 'SF', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', '7S']],
  ['DE', ['DA', 'DB', 'DC', 'DD', 'DE', 'DF', 'DG', 'DH', 'DI', 'DJ', 'DK', 'DL', 'DM', 'DN', 'DO', 'DP', 'DQ', 'DR']],
  ['GB', ['G', 'M', 'VP', 'VQ', 'VS', 'ZB', 'ZC', 'ZD', 'ZE', 'ZF', 'ZG', 'ZH', 'ZI', 'ZJ', 'ZN', 'ZO', 'ZQ']],
  ['JP', ['JA', 'JB', 'JC', 'JD', 'JE', 'JF', 'JG', 'JH', 'JI', 'JJ', 'JK', 'JL', 'JM', 'JN', 'JO', 'JP', 'JQ', 'JR', 'JS']],
  ['AU', ['AX', 'VH', 'VI', 'VJ', 'VK', 'VN', 'VZ']],
  ['SG', ['9V']],
  ['NZ', ['ZK', 'ZL', 'ZM']],
]);

const SEARCH_REGEX = /([A-Z,\d]{1,3}\d[A-Z]{1,3}(?:\/\d)?)\s/;
const PARTS_REGEX = /([A-Z,\d]{1,3})(\d)([A-Z]{1,3})(?:\/(\d))?/;

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

/**
 * Simulates searchCallsigns logic - finds call signs and validates their prefixes
 * @param {string} text - Text to search
 * @returns {Array} - Array of valid call signs found
 */
function findValidCallsigns(text) {
  'use strict';
  const matches = [];
  let match;
  const regex = new RegExp(SEARCH_REGEX, 'g');

  // Note: The actual searchCallsigns adds a space for the regex to match the last word
  // We replicate that behavior here
  while ((match = regex.exec(`${text} `)) !== null) {
    const callsign = match[1];
    // Parse the call sign to extract the prefix
    const parts = callsign.match(PARTS_REGEX);
    if (parts && isValidPrefix(parts[1])) {
      matches.push(callsign);
    }
  }

  return matches;
}

describe('searchCallsigns with prefix validation', () => {
  describe('Valid call signs (should be marked up)', () => {
    test('should find US call signs with valid prefixes', () => {
      expect(findValidCallsigns('I heard W1AW today')).toEqual(['W1AW']);
      expect(findValidCallsigns('Contact K2ABC tomorrow')).toEqual(['K2ABC']);
      expect(findValidCallsigns('N3XYZ is on air')).toEqual(['N3XYZ']);
    });

    test('should find US call signs with two-letter prefixes', () => {
      expect(findValidCallsigns('AA1AA called CQ')).toEqual(['AA1AA']);
      expect(findValidCallsigns('Worked AB2CD today')).toEqual(['AB2CD']);
    });

    test('should find international call signs with valid prefixes', () => {
      expect(findValidCallsigns('SM8AYA from Sweden')).toEqual(['SM8AYA']);
      expect(findValidCallsigns('DL1ABC in Germany')).toEqual(['DL1ABC']);
      expect(findValidCallsigns('G0XYZ from UK')).toEqual(['G0XYZ']);
      expect(findValidCallsigns('JA1XYZ from Japan')).toEqual(['JA1XYZ']);
    });

    test('should find call signs with portable indicators', () => {
      expect(findValidCallsigns('W1ABC/3 portable operation')).toEqual(['W1ABC/3']);
      expect(findValidCallsigns('SM8AYA/5 on vacation')).toEqual(['SM8AYA/5']);
    });

    test('should find multiple valid call signs in same text', () => {
      const text = 'W1AW worked SM8AYA and DL1ABC today';
      const found = findValidCallsigns(text);
      expect(found).toContain('W1AW');
      expect(found).toContain('SM8AYA');
      expect(found).toContain('DL1ABC');
      expect(found.length).toBe(3);
    });
  });

  describe('Invalid call signs (should NOT be marked up)', () => {
    test('should reject call signs with unregistered single-letter prefixes', () => {
      // Q, X are not valid prefixes in our PREFIX_TABLE subset
      expect(findValidCallsigns('Q1ABC is not valid')).toEqual([]);
      expect(findValidCallsigns('X2XYZ is not valid')).toEqual([]);
    });

    test('should reject call signs with unregistered two-letter prefixes', () => {
      // BB, KK, QQ are not valid prefixes
      expect(findValidCallsigns('BB1ABC is fake')).toEqual([]);
      expect(findValidCallsigns('KK2XYZ not real')).toEqual([]);
      expect(findValidCallsigns('QQ3ABC invalid')).toEqual([]);
    });

    test('should reject patterns that look like call signs but have invalid prefixes', () => {
      // These match the regex pattern but don't have valid prefixes
      expect(findValidCallsigns('ZZ1ABC looks like callsign')).toEqual([]); // ZZ not in our subset
      expect(findValidCallsigns('XX1XYZ also looks valid')).toEqual([]); // XX not in our subset
    });

    test('should match patterns when space is artificially added (as searchCallsigns does)', () => {
      // The actual searchCallsigns adds a space to match the last word in text
      // So even 'W1AW' without trailing space will match
      expect(findValidCallsigns('W1AW')).toEqual(['W1AW']);
      // But punctuation breaks the match since regex requires \s
      expect(findValidCallsigns('W1AW.')).toEqual([]);
    });
  });

  describe('Mixed valid and invalid call signs', () => {
    test('should only find valid call signs when mixed with invalid ones', () => {
      const text = 'W1AW worked BB1ABC and SM8AYA but not QQ2XYZ today';
      const found = findValidCallsigns(text);
      expect(found).toContain('W1AW');
      expect(found).toContain('SM8AYA');
      expect(found).not.toContain('BB1ABC'); // Invalid prefix
      expect(found).not.toContain('QQ2XYZ'); // Invalid prefix
      expect(found.length).toBe(2);
    });

    test('should handle text with similar looking but invalid patterns', () => {
      const text = 'Valid: W1AW K2ABC Invalid: Q1XYZ X2ABC Real: DL1ABC';
      const found = findValidCallsigns(text);
      expect(found).toContain('W1AW');
      expect(found).toContain('K2ABC');
      expect(found).toContain('DL1ABC');
      expect(found).not.toContain('Q1XYZ');
      expect(found).not.toContain('X2ABC');
      expect(found.length).toBe(3);
    });
  });

  describe('Edge cases with prefix validation', () => {
    test('should validate prefix correctly for patterns with numbers in prefix', () => {
      expect(findValidCallsigns('9V1ABC from Singapore')).toEqual(['9V1ABC']);
    });

    test('should handle minimum length call signs with valid prefixes', () => {
      expect(findValidCallsigns('W1A minimum length')).toEqual(['W1A']);
      expect(findValidCallsigns('K2B also minimum')).toEqual(['K2B']);
    });

    test('should handle maximum length call signs with valid prefixes', () => {
      // Maximum: 3-letter prefix + digit + 3-letter suffix
      // But VK2ABC would be parsed as VK (prefix) + 2 (digit) + ABC (suffix) which is valid
      expect(findValidCallsigns('VK2ABC from Australia')).toEqual(['VK2ABC']);
    });

    test('should correctly parse and validate greedy prefix matches', () => {
      // ABC1XYZ would match BCD as prefix if all are valid, but we need to check actual parsing
      // The regex is greedy so it takes maximum prefix length possible
      const text = 'SM8AYA is valid';
      const found = findValidCallsigns(text);
      expect(found).toEqual(['SM8AYA']);
    });
  });

  describe('Real-world scenarios', () => {
    test('should handle typical amateur radio log entries', () => {
      const log = 'Worked W1AW on 20m, then SM8AYA on 40m. QSO with DL1ABC at 1800z.';
      const found = findValidCallsigns(log);
      expect(found).toContain('W1AW');
      expect(found).toContain('SM8AYA');
      expect(found).toContain('DL1ABC');
      expect(found.length).toBe(3);
    });

    test('should filter out fake call signs in mixed content', () => {
      const text = 'Real stations: W1AW K2ABC SM8AYA here. Fake: XX1ABC QQ2XYZ BB1ABC there.';
      const found = findValidCallsigns(text);
      expect(found.length).toBe(3); // Only the valid ones
      expect(found).toContain('W1AW');
      expect(found).toContain('K2ABC');
      expect(found).toContain('SM8AYA');
    });

    test('should handle contest-style call sign lists', () => {
      const text = 'Worked: W1AW N3XYZ G0ABC JA1XYZ VK2DEF today';
      const found = findValidCallsigns(text);
      expect(found).toContain('W1AW');
      expect(found).toContain('N3XYZ');
      expect(found).toContain('G0ABC');
      expect(found).toContain('JA1XYZ');
      expect(found).toContain('VK2DEF');
      expect(found.length).toBe(5);
    });
  });
});