/**
 * Unit tests focusing on SEARCH_REGEX pattern validation
 * The SEARCH_REGEX pattern: /([A-Z,\d]{1,3}\d[A-Z]{1,3}(?:\/\d)?)\s/
 * This pattern detects call signs in text that:
 * - Start with 1-3 alphanumeric characters (prefix)
 * - Have exactly one digit (area number)
 * - Have 1-3 letters (suffix)
 * - Optionally have /digit (portable indicator)
 * - Must be followed by a space
 */

const SEARCH_REGEX = /([A-Z,\d]{1,3}\d[A-Z]{1,3}(?:\/\d)?)\s/;

describe('SEARCH_REGEX pattern validation', () => {
  describe('Valid call sign patterns', () => {
    test('should match single-letter prefix patterns', () => {
      expect('W1AW '.match(SEARCH_REGEX)).toBeTruthy();
      expect('W1AW '.match(SEARCH_REGEX)[1]).toBe('W1AW');
      
      expect('K2ABC '.match(SEARCH_REGEX)).toBeTruthy();
      expect('K2ABC '.match(SEARCH_REGEX)[1]).toBe('K2ABC');
      
      expect('N3X '.match(SEARCH_REGEX)).toBeTruthy();
      expect('N3X '.match(SEARCH_REGEX)[1]).toBe('N3X');
    });

    test('should match two-letter prefix patterns', () => {
      expect('SM8AYA '.match(SEARCH_REGEX)).toBeTruthy();
      expect('SM8AYA '.match(SEARCH_REGEX)[1]).toBe('SM8AYA');
      
      expect('DL1ABC '.match(SEARCH_REGEX)).toBeTruthy();
      expect('DL1ABC '.match(SEARCH_REGEX)[1]).toBe('DL1ABC');
      
      expect('G0XYZ '.match(SEARCH_REGEX)).toBeTruthy();
      expect('G0XYZ '.match(SEARCH_REGEX)[1]).toBe('G0XYZ');
    });

    test('should match three-letter prefix patterns', () => {
      expect('VK2ABC '.match(SEARCH_REGEX)).toBeTruthy();
      expect('VK2ABC '.match(SEARCH_REGEX)[1]).toBe('VK2ABC');
      
      expect('XX91A '.match(SEARCH_REGEX)).toBeTruthy();
      expect('XX91A '.match(SEARCH_REGEX)[1]).toBe('XX91A');
    });

    test('should match patterns with number in prefix', () => {
      expect('9V1ABC '.match(SEARCH_REGEX)).toBeTruthy();
      expect('9V1ABC '.match(SEARCH_REGEX)[1]).toBe('9V1ABC');
      
      expect('3D2XYZ '.match(SEARCH_REGEX)).toBeTruthy();
      expect('3D2XYZ '.match(SEARCH_REGEX)[1]).toBe('3D2XYZ');
    });

    test('should match patterns with varying suffix lengths (1-3 letters)', () => {
      expect('W1A '.match(SEARCH_REGEX)).toBeTruthy();
      expect('W1A '.match(SEARCH_REGEX)[1]).toBe('W1A');
      
      expect('W1AB '.match(SEARCH_REGEX)).toBeTruthy();
      expect('W1AB '.match(SEARCH_REGEX)[1]).toBe('W1AB');
      
      expect('W1ABC '.match(SEARCH_REGEX)).toBeTruthy();
      expect('W1ABC '.match(SEARCH_REGEX)[1]).toBe('W1ABC');
    });

    test('should match patterns with portable indicators', () => {
      expect('W1ABC/3 '.match(SEARCH_REGEX)).toBeTruthy();
      expect('W1ABC/3 '.match(SEARCH_REGEX)[1]).toBe('W1ABC/3');
      
      expect('SM8AYA/5 '.match(SEARCH_REGEX)).toBeTruthy();
      expect('SM8AYA/5 '.match(SEARCH_REGEX)[1]).toBe('SM8AYA/5');
      
      expect('K2ABC/0 '.match(SEARCH_REGEX)).toBeTruthy();
      expect('K2ABC/0 '.match(SEARCH_REGEX)[1]).toBe('K2ABC/0');
    });

    test('should match all digit variations (0-9) in area number position', () => {
      for (let i = 0; i < 10; i++) {
        const callsign = `W${i}AW `;
        const match = callsign.match(SEARCH_REGEX);
        expect(match).toBeTruthy();
        expect(match[1]).toBe(`W${i}AW`);
      }
    });
  });

  describe('Invalid call sign patterns (should NOT match)', () => {
    test('should NOT match patterns without trailing space', () => {
      expect('W1AW'.match(SEARCH_REGEX)).toBeNull();
      expect('W1AWX'.match(SEARCH_REGEX)).toBeNull();
      expect('K2ABC!'.match(SEARCH_REGEX)).toBeNull();
    });

    test('should NOT match patterns with no digit in area position', () => {
      expect('WAAW '.match(SEARCH_REGEX)).toBeNull();
      expect('KAABC '.match(SEARCH_REGEX)).toBeNull();
    });

    test('should match patterns with multiple digits (regex allows this)', () => {
      // The regex actually DOES match W12AW because {1,3} in prefix can capture W1, then 2 becomes the digit
      const match = 'W12AW '.match(SEARCH_REGEX);
      expect(match).toBeTruthy();
      expect(match[1]).toBe('W12AW'); // Captures W1 as prefix, 2 as digit, AW as suffix
    });

    test('should NOT match patterns with suffix too short (0 letters)', () => {
      expect('W1 '.match(SEARCH_REGEX)).toBeNull();
      expect('K2 '.match(SEARCH_REGEX)).toBeNull();
    });

    test('should NOT match patterns with suffix too long (4+ letters)', () => {
      expect('W1ABCD '.match(SEARCH_REGEX)).toBeNull();
      expect('K2ABCDE '.match(SEARCH_REGEX)).toBeNull();
    });

    test('should match patterns with long prefixes (regex captures first 3 chars)', () => {
      // ABCD1ABC will match as ABC (prefix) + D1A (but wait, the regex will actually match BCD1ABC)
      // The regex is greedy and will match the LAST valid pattern
      const match = 'ABCD1ABC '.match(SEARCH_REGEX);
      expect(match).toBeTruthy();
      // It matches BCD as prefix (3 chars), 1 as digit, ABC as suffix
      expect(match[1]).toBe('BCD1ABC');
    });

    test('should NOT match patterns with lowercase letters', () => {
      expect('w1aw '.match(SEARCH_REGEX)).toBeNull();
      expect('K2abc '.match(SEARCH_REGEX)).toBeNull();
    });

    test('should NOT match patterns with special characters', () => {
      expect('W-1AW '.match(SEARCH_REGEX)).toBeNull();
      expect('K@2ABC '.match(SEARCH_REGEX)).toBeNull();
      expect('W1A-W '.match(SEARCH_REGEX)).toBeNull();
    });

    test('should NOT match portable indicators with multiple digits', () => {
      expect('W1ABC/34 '.match(SEARCH_REGEX)).toBeNull();
    });

    test('should NOT match portable indicators with letters', () => {
      expect('W1ABC/M '.match(SEARCH_REGEX)).toBeNull();
      expect('W1ABC/P '.match(SEARCH_REGEX)).toBeNull();
    });
  });

  describe('Edge cases and boundary conditions', () => {
    test('should match minimum length call sign (1+1+1)', () => {
      expect('W1A '.match(SEARCH_REGEX)).toBeTruthy();
      expect('W1A '.match(SEARCH_REGEX)[1]).toBe('W1A');
    });

    test('should match maximum length call sign without portable (3+1+3)', () => {
      expect('ABC1XYZ '.match(SEARCH_REGEX)).toBeTruthy();
      expect('ABC1XYZ '.match(SEARCH_REGEX)[1]).toBe('ABC1XYZ');
    });

    test('should match maximum length with portable indicator (3+1+3+/+1)', () => {
      expect('ABC1XYZ/5 '.match(SEARCH_REGEX)).toBeTruthy();
      expect('ABC1XYZ/5 '.match(SEARCH_REGEX)[1]).toBe('ABC1XYZ/5');
    });

    test('should match call signs in the middle of text', () => {
      const text = 'I heard W1AW on the air today';
      const match = text.match(SEARCH_REGEX);
      expect(match).toBeTruthy();
      expect(match[1]).toBe('W1AW');
    });

    test('should match first occurrence only per match call', () => {
      const text = 'W1AW K2ABC ';
      const match = text.match(SEARCH_REGEX);
      expect(match[1]).toBe('W1AW'); // Should get first one
    });

    test('should match whitespace characters (\\s includes tab, newline, space)', () => {
      // The \\s in regex matches any whitespace, not just space
      expect('W1AW\t'.match(SEARCH_REGEX)).toBeTruthy();
      expect('W1AW\n'.match(SEARCH_REGEX)).toBeTruthy();
      expect('W1AW '.match(SEARCH_REGEX)).toBeTruthy();
    });

    test('should match with comma in prefix (as per regex pattern)', () => {
      // The regex allows comma in prefix: [A-Z,\d]
      expect('W,1ABC '.match(SEARCH_REGEX)).toBeTruthy();
      expect('A,1X '.match(SEARCH_REGEX)).toBeTruthy();
    });
  });

  describe('Real-world call sign examples', () => {
    test('should match common US call signs', () => {
      expect('W1AW '.match(SEARCH_REGEX)[1]).toBe('W1AW');
      expect('K2ABC '.match(SEARCH_REGEX)[1]).toBe('K2ABC');
      expect('N3XYZ '.match(SEARCH_REGEX)[1]).toBe('N3XYZ');
      expect('AA1AA '.match(SEARCH_REGEX)[1]).toBe('AA1AA');
      expect('KD8ABC '.match(SEARCH_REGEX)[1]).toBe('KD8ABC');
    });

    test('should match common international call signs', () => {
      expect('SM8AYA '.match(SEARCH_REGEX)[1]).toBe('SM8AYA');
      expect('DL1ABC '.match(SEARCH_REGEX)[1]).toBe('DL1ABC');
      expect('G0ABC '.match(SEARCH_REGEX)[1]).toBe('G0ABC');
      expect('JA1XYZ '.match(SEARCH_REGEX)[1]).toBe('JA1XYZ');
      expect('VK2DEF '.match(SEARCH_REGEX)[1]).toBe('VK2DEF');
    });

    test('should match special territory prefixes', () => {
      expect('9V1ABC '.match(SEARCH_REGEX)[1]).toBe('9V1ABC');
      expect('3D2XYZ '.match(SEARCH_REGEX)[1]).toBe('3D2XYZ');
      expect('5N1ABC '.match(SEARCH_REGEX)[1]).toBe('5N1ABC');
    });
  });
});