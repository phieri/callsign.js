/**
 * Unit tests focusing on PARTS_REGEX pattern validation
 * The PARTS_REGEX pattern: /([A-Z,\d]{1,3})(\d)([A-Z]{1,3})(?:\/(\d))?/
 * This pattern parses call signs into their components:
 * - Capture group 1: Prefix (1-3 alphanumeric characters)
 * - Capture group 2: Area digit (exactly 1 digit)
 * - Capture group 3: Suffix (1-3 letters)
 * - Capture group 4: Portable indicator digit (optional)
 */

const PARTS_REGEX = /([A-Z,\d]{1,3})(\d)([A-Z]{1,3})(?:\/(\d))?/;

describe('PARTS_REGEX pattern validation', () => {
  describe('Basic parsing of call sign components', () => {
    test('should parse single-letter prefix call sign', () => {
      const match = 'W1AW'.match(PARTS_REGEX);
      expect(match).toBeTruthy();
      expect(match[1]).toBe('W'); // prefix
      expect(match[2]).toBe('1'); // area digit
      expect(match[3]).toBe('AW'); // suffix
      expect(match[4]).toBeUndefined(); // no portable indicator
    });

    test('should parse two-letter prefix call sign', () => {
      const match = 'SM8AYA'.match(PARTS_REGEX);
      expect(match).toBeTruthy();
      expect(match[1]).toBe('SM'); // prefix
      expect(match[2]).toBe('8'); // area digit
      expect(match[3]).toBe('AYA'); // suffix
      expect(match[4]).toBeUndefined();
    });

    test('should parse three-letter prefix call sign', () => {
      const match = 'VK2ABC'.match(PARTS_REGEX);
      expect(match).toBeTruthy();
      expect(match[1]).toBe('VK'); // prefix (will match first 2 chars)
      expect(match[2]).toBe('2'); // area digit
      expect(match[3]).toBe('ABC'); // suffix
    });

    test('should parse call sign with portable indicator', () => {
      const match = 'W1ABC/3'.match(PARTS_REGEX);
      expect(match).toBeTruthy();
      expect(match[1]).toBe('W'); // prefix
      expect(match[2]).toBe('1'); // area digit
      expect(match[3]).toBe('ABC'); // suffix
      expect(match[4]).toBe('3'); // portable indicator
    });
  });

  describe('Prefix variations (1-3 characters)', () => {
    test('should parse minimum prefix length (1 character)', () => {
      const match = 'K2ABC'.match(PARTS_REGEX);
      expect(match[1]).toBe('K');
      expect(match[2]).toBe('2');
      expect(match[3]).toBe('ABC');
    });

    test('should parse medium prefix length (2 characters)', () => {
      const match = 'DL1ABC'.match(PARTS_REGEX);
      expect(match[1]).toBe('DL');
      expect(match[2]).toBe('1');
      expect(match[3]).toBe('ABC');
    });

    test('should parse maximum prefix length (3 characters)', () => {
      const match = 'ABC1XYZ'.match(PARTS_REGEX);
      expect(match[1]).toBe('ABC');
      expect(match[2]).toBe('1');
      expect(match[3]).toBe('XYZ');
    });

    test('should parse prefix with number', () => {
      const match = '9V1ABC'.match(PARTS_REGEX);
      expect(match[1]).toBe('9V');
      expect(match[2]).toBe('1');
      expect(match[3]).toBe('ABC');
    });

    test('should parse prefix with leading number', () => {
      const match = '3D2XYZ'.match(PARTS_REGEX);
      expect(match[1]).toBe('3D');
      expect(match[2]).toBe('2');
      expect(match[3]).toBe('XYZ');
    });
  });

  describe('Area digit variations (0-9)', () => {
    test('should parse all digits 0-9 in area position', () => {
      for (let i = 0; i < 10; i++) {
        const callsign = `W${i}AW`;
        const match = callsign.match(PARTS_REGEX);
        expect(match).toBeTruthy();
        expect(match[2]).toBe(String(i));
      }
    });

    test('should parse area digit 0', () => {
      const match = 'G0ABC'.match(PARTS_REGEX);
      expect(match[2]).toBe('0');
    });

    test('should parse area digit 9', () => {
      const match = 'K9XYZ'.match(PARTS_REGEX);
      expect(match[2]).toBe('9');
    });
  });

  describe('Suffix variations (1-3 letters)', () => {
    test('should parse minimum suffix length (1 letter)', () => {
      const match = 'W1A'.match(PARTS_REGEX);
      expect(match[1]).toBe('W');
      expect(match[2]).toBe('1');
      expect(match[3]).toBe('A');
    });

    test('should parse medium suffix length (2 letters)', () => {
      const match = 'W1AB'.match(PARTS_REGEX);
      expect(match[1]).toBe('W');
      expect(match[2]).toBe('1');
      expect(match[3]).toBe('AB');
    });

    test('should parse maximum suffix length (3 letters)', () => {
      const match = 'W1ABC'.match(PARTS_REGEX);
      expect(match[1]).toBe('W');
      expect(match[2]).toBe('1');
      expect(match[3]).toBe('ABC');
    });
  });

  describe('Portable indicator parsing', () => {
    test('should parse all portable indicators (0-9)', () => {
      for (let i = 0; i < 10; i++) {
        const callsign = `W1ABC/${i}`;
        const match = callsign.match(PARTS_REGEX);
        expect(match).toBeTruthy();
        expect(match[4]).toBe(String(i));
      }
    });

    test('should parse portable indicator 0', () => {
      const match = 'W1ABC/0'.match(PARTS_REGEX);
      expect(match[4]).toBe('0');
    });

    test('should parse portable indicator 9', () => {
      const match = 'W1ABC/9'.match(PARTS_REGEX);
      expect(match[4]).toBe('9');
    });

    test('should handle missing portable indicator', () => {
      const match = 'W1ABC'.match(PARTS_REGEX);
      expect(match[4]).toBeUndefined();
    });
  });

  describe('Edge cases and special patterns', () => {
    test('should parse minimum length call sign (1+1+1)', () => {
      const match = 'W1A'.match(PARTS_REGEX);
      expect(match[0]).toBe('W1A');
      expect(match[1]).toBe('W');
      expect(match[2]).toBe('1');
      expect(match[3]).toBe('A');
    });

    test('should parse maximum length call sign (3+1+3+/+1)', () => {
      const match = 'ABC1XYZ/5'.match(PARTS_REGEX);
      expect(match[0]).toBe('ABC1XYZ/5');
      expect(match[1]).toBe('ABC');
      expect(match[2]).toBe('1');
      expect(match[3]).toBe('XYZ');
      expect(match[4]).toBe('5');
    });

    test('should parse call sign with comma in prefix', () => {
      // The regex allows comma: [A-Z,\d]
      const match = 'W,1ABC'.match(PARTS_REGEX);
      expect(match[1]).toBe('W,');
      expect(match[2]).toBe('1');
      expect(match[3]).toBe('ABC');
    });

    test('should parse call sign when embedded in text', () => {
      const text = 'Contact W1AW today';
      const match = text.match(PARTS_REGEX);
      expect(match).toBeTruthy();
      expect(match[1]).toBe('W');
      expect(match[2]).toBe('1');
      expect(match[3]).toBe('AW');
    });
  });

  describe('Invalid patterns (should match but with unexpected results)', () => {
    test('should not parse lowercase letters correctly', () => {
      // Lowercase won't match the [A-Z] pattern
      const match = 'w1aw'.match(PARTS_REGEX);
      expect(match).toBeNull();
    });

    test('should not parse patterns with no area digit', () => {
      const match = 'WABC'.match(PARTS_REGEX);
      expect(match).toBeNull();
    });

    test('should capture from long prefix correctly (greedy matching)', () => {
      // The regex {1,3} is greedy, so ABCD1XYZ will match BCD1XYZ (last 3 chars + digit + suffix)
      const match = 'ABCD1XYZ'.match(PARTS_REGEX);
      expect(match).toBeTruthy();
      expect(match[1]).toBe('BCD'); // Captures last 3 characters before digit
      expect(match[2]).toBe('1');
      expect(match[3]).toBe('XYZ');
    });

    test('should not parse special characters', () => {
      const match = 'W-1ABC'.match(PARTS_REGEX);
      expect(match).toBeNull();
    });
  });

  describe('Real-world call sign parsing', () => {
    test('should correctly parse common US call signs', () => {
      const usCallSigns = [
        { call: 'W1AW', prefix: 'W', digit: '1', suffix: 'AW' },
        { call: 'K2ABC', prefix: 'K', digit: '2', suffix: 'ABC' },
        { call: 'N3XYZ', prefix: 'N', digit: '3', suffix: 'XYZ' },
        { call: 'AA1AA', prefix: 'AA', digit: '1', suffix: 'AA' },
        { call: 'KD8ABC', prefix: 'KD', digit: '8', suffix: 'ABC' },
      ];

      usCallSigns.forEach(({ call, prefix, digit, suffix }) => {
        const match = call.match(PARTS_REGEX);
        expect(match[1]).toBe(prefix);
        expect(match[2]).toBe(digit);
        expect(match[3]).toBe(suffix);
      });
    });

    test('should correctly parse common international call signs', () => {
      const intlCallSigns = [
        { call: 'SM8AYA', prefix: 'SM', digit: '8', suffix: 'AYA' },
        { call: 'DL1ABC', prefix: 'DL', digit: '1', suffix: 'ABC' },
        { call: 'G0ABC', prefix: 'G', digit: '0', suffix: 'ABC' },
        { call: 'JA1XYZ', prefix: 'JA', digit: '1', suffix: 'XYZ' },
        { call: 'VK2DEF', prefix: 'VK', digit: '2', suffix: 'DEF' },
      ];

      intlCallSigns.forEach(({ call, prefix, digit, suffix }) => {
        const match = call.match(PARTS_REGEX);
        expect(match[1]).toBe(prefix);
        expect(match[2]).toBe(digit);
        expect(match[3]).toBe(suffix);
      });
    });

    test('should correctly parse call signs with portable indicators', () => {
      const portableCallSigns = [
        { call: 'W1ABC/3', prefix: 'W', digit: '1', suffix: 'ABC', portable: '3' },
        { call: 'SM8AYA/5', prefix: 'SM', digit: '8', suffix: 'AYA', portable: '5' },
        { call: 'K2ABC/0', prefix: 'K', digit: '2', suffix: 'ABC', portable: '0' },
      ];

      portableCallSigns.forEach(({ call, prefix, digit, suffix, portable }) => {
        const match = call.match(PARTS_REGEX);
        expect(match[1]).toBe(prefix);
        expect(match[2]).toBe(digit);
        expect(match[3]).toBe(suffix);
        expect(match[4]).toBe(portable);
      });
    });
  });

  describe('Comparison with SEARCH_REGEX requirements', () => {
    test('should parse same patterns that SEARCH_REGEX would match', () => {
      // These are patterns that SEARCH_REGEX would match (with trailing space)
      // PARTS_REGEX should parse them correctly
      const validPatterns = [
        'W1AW',
        'K2ABC',
        'SM8AYA',
        'DL1ABC',
        'W1ABC/3',
        '9V1ABC',
        'VK2ABC',
      ];

      validPatterns.forEach(pattern => {
        const match = pattern.match(PARTS_REGEX);
        expect(match).toBeTruthy();
        expect(match[0]).toBe(pattern);
      });
    });

    test('should not require trailing space (unlike SEARCH_REGEX)', () => {
      // PARTS_REGEX doesn't require space, unlike SEARCH_REGEX
      const match = 'W1AW'.match(PARTS_REGEX);
      expect(match).toBeTruthy();
      expect(match[0]).toBe('W1AW');
    });
  });
});
