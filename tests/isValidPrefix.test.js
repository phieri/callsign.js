import '../src/callsign.js';

const { Callsign } = window;

describe('Callsign.isValidPrefix', () => {
  test.each([
    'W', 'K', 'N', 'AA', 'AB', 'AL',
    'SM', 'SA', '7S', 'DA', 'DL', 'DM', 'G', 'M',
    '9V', '3D', '5N', 'HB0', 'XX9', 'S79',
    'ZZ', 'ZX', 'XX', 'YY', 'AZ', 'JA', 'VK', 'ZL',
  ])('recognizes allocated prefix %s', (prefix) => {
    expect(Callsign.isValidPrefix(prefix)).toBe(true);
  });

  test.each(['Q', 'X', 'QQ', 'QX', '', '123', 'VK2', 'W1AW', ' SM', 'SM '])(
    'rejects unallocated or malformed prefix %j',
    (prefix) => {
      expect(Callsign.isValidPrefix(prefix)).toBe(false);
    }
  );

  test.each(['w', 'sm', 'Sm', '9v'])('requires uppercase in %s', (prefix) => {
    expect(Callsign.isValidPrefix(prefix)).toBe(false);
  });

  test.each(['KD', 'KK', 'NQ', 'WB', 'BB'])(
    'requires an exact table entry rather than a derived allocation for %s',
    (prefix) => {
      expect(Callsign.isValidPrefix(prefix)).toBe(false);
    }
  );
});
