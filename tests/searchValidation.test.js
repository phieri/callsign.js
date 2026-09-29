import '../src/callsign.js';

const { Callsign } = window;

beforeAll(() => {
  if (!customElements.get('call-sign')) {
    document.dispatchEvent(new Event('DOMContentLoaded'));
  }
});

afterEach(() => document.body.replaceChildren());

function searchText(text) {
  document.body.textContent = text;
  Callsign.searchCallsigns();
  expect(document.body.textContent).toBe(text);
  return Array.from(document.querySelectorAll('call-sign'), (element) => element.textContent);
}

describe('automatic call sign syntax and boundaries', () => {
  test.each([
    'W1AW', 'K2ABC', 'N3X', 'SM8AYA', 'DL1ABC', 'G0XYZ',
    'VK2ABC', 'XX91A', '9V1ABC', '3D2XYZ', '5N1ABC',
    'W1A', 'W1AB', 'W1ABC', 'W12AW',
    'AA1AA', 'KD8ABC', 'JA1XYZ',
    'W1ABC/3', 'SM8AYA/5', 'K2ABC/0',
    'W1ABC/P', 'W1ABC/M', 'W1ABC/MM', 'W1ABC/AM', 'W1ABC/QRP',
  ])('finds complete call sign %s without requiring trailing whitespace', (text) => {
    expect(searchText(text)).toEqual([text]);
  });

  test.each(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])(
    'accepts area and portable digit %s',
    (digit) => {
      const call = `W${digit}AW/${digit}`;
      expect(searchText(call)).toEqual([call]);
    }
  );

  test.each([
    'WAAW', 'KAABC', 'W1', 'K2', 'W1ABCD', 'K2ABCDE', 'ABCD1ABC',
    'w1aw', 'K2abc', 'W1Aw', 'W-1AW', 'K@2ABC', 'W,1ABC', 'A,1X',
    'W1ABC/34', 'W1ABC/XYZ', 'W1ABC/', '/W1ABC', 'EA/W1ABC',
    'W1ABC/P/3', 'W1ABC/p', 'W1ABC/MMM',
  ])('does not wrap malformed input or slash fragment %j', (text) => {
    expect(searchText(text)).toEqual([]);
  });

  test.each([
    ['W1AW.', ['W1AW']],
    ['(W1AW), [K2ABC]; SM8AYA!', ['W1AW', 'K2ABC', 'SM8AYA']],
    ['W1AW,K2ABC', ['W1AW', 'K2ABC']],
    ['“W1AW” — K2ABC?', ['W1AW', 'K2ABC']],
    ['W1AW\tK2ABC\nSM8AYA DL1ABC', ['W1AW', 'K2ABC', 'SM8AYA', 'DL1ABC']],
    ['I heard W1AW on the air today', ['W1AW']],
    ['W1AW W1AW', ['W1AW', 'W1AW']],
  ])('finds all whole call signs in %j', (text, expected) => {
    expect(searchText(text)).toEqual(expected);
  });

  test.each([
    'prefixW1AW', 'W1AWsuffix', '_W1AW', 'W1AW_', '1W1AWX',
    'éW1AW', 'W1AWé', '中W1AW', 'W1AW中', '١W1AW', 'W1AW١',
  ])('does not match inside a larger Unicode word %j', (text) => {
    expect(searchText(text)).toEqual([]);
  });
});
