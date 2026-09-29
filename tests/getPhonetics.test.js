import '../src/callsign.js';

const { Callsign } = window;

describe('Callsign.getPhonetics', () => {
  test.each([
    ['W1AW', 'Whiskey One Alfa Whiskey'],
    ['K2ABC', 'Kilo Two Alfa Bravo Charlie'],
    ['SM8AYA', 'Sierra Mike Eight Alfa Yankee Alfa'],
    ['DL1ABC', 'Delta Lima One Alfa Bravo Charlie'],
    ['W1A', 'Whiskey One Alfa'],
    ['ABC1XYZ', 'Alfa Bravo Charlie One X-ray Yankee Zulu'],
    ['W', 'Whiskey'],
    ['K', 'Kilo'],
    ['N', 'November'],
    ['AA', 'Alfa Alfa'],
    ['SM', 'Sierra Mike'],
    ['DL', 'Delta Lima'],
    ['JA', 'Juliett Alfa'],
    ['VK', 'Victor Kilo'],
  ])('expands %s', (input, expected) => {
    expect(Callsign.getPhonetics(input)).toBe(expected);
  });

  test.each([
    ['A', 'Alfa'], ['B', 'Bravo'], ['C', 'Charlie'], ['D', 'Delta'],
    ['E', 'Echo'], ['F', 'Foxtrot'], ['G', 'Golf'], ['H', 'Hotel'],
    ['I', 'India'], ['J', 'Juliett'], ['K', 'Kilo'], ['L', 'Lima'],
    ['M', 'Mike'], ['N', 'November'], ['O', 'Oscar'], ['P', 'Papa'],
    ['Q', 'Quebec'], ['R', 'Romeo'], ['S', 'Sierra'], ['T', 'Tango'],
    ['U', 'Uniform'], ['V', 'Victor'], ['W', 'Whiskey'], ['X', 'X-ray'],
    ['Y', 'Yankee'], ['Z', 'Zulu'],
    ['0', 'Ziro'], ['1', 'One'], ['2', 'Two'], ['3', 'Tree'],
    ['4', 'Four'], ['5', 'Five'], ['6', 'Six'], ['7', 'Seven'],
    ['8', 'Eight'], ['9', 'Niner'],
  ])('uses the radio phonetic for %s', (character, expected) => {
    expect(Callsign.getPhonetics(character)).toBe(expected);
  });

  test.each([
    ['', ''],
    ['w1aw', 'Whiskey One Alfa Whiskey'],
    ['W1ABC/3', 'Whiskey One Alfa Bravo Charlie Tree'],
    ['W1AW/P', 'Whiskey One Alfa Whiskey Papa'],
    [' W1AW! ', 'Whiskey One Alfa Whiskey'],
    ['/?😀', ''],
  ])('normalizes letters and ignores unmapped characters in %j', (input, expected) => {
    expect(Callsign.getPhonetics(input)).toBe(expected);
  });
});
