import '../src/callsign.js';

beforeAll(() => {
  if (!customElements.get('call-sign')) {
    document.dispatchEvent(new Event('DOMContentLoaded'));
  }
});

afterEach(() => document.body.replaceChildren());

function renderCallsign(text) {
  const element = document.createElement('call-sign');
  element.textContent = text;
  document.body.appendChild(element);
  return element;
}

describe('manual call sign parsing through the custom element', () => {
  test.each([
    ['W1AW', 'W', '1', 'AW'],
    ['K2ABC', 'K', '2', 'ABC'],
    ['N3XYZ', 'N', '3', 'XYZ'],
    ['AA1AA', 'AA', '1', 'AA'],
    ['KD8ABC', 'KD', '8', 'ABC'],
    ['SM8AYA', 'SM', '8', 'AYA'],
    ['DL1ABC', 'DL', '1', 'ABC'],
    ['G0ABC', 'G', '0', 'ABC'],
    ['JA1XYZ', 'JA', '1', 'XYZ'],
    ['VK2DEF', 'VK', '2', 'DEF'],
    ['ABC1XYZ', 'ABC', '1', 'XYZ'],
    ['9V1ABC', '9V', '1', 'ABC'],
    ['3D2XYZ', '3D', '2', 'XYZ'],
    ['XX91A', 'XX9', '1', 'A'],
    ['W12AW', 'W1', '2', 'AW'],
    ['W1A', 'W', '1', 'A'],
    ['W1AB', 'W', '1', 'AB'],
    ['W1ABC', 'W', '1', 'ABC'],
    ['ABC1XYZ/5', 'ABC', '1', 'XYZ/5'],
    ['SM8AYA/5', 'SM', '8', 'AYA/5'],
    ['K2ABC/0', 'K', '2', 'ABC/0'],
    ['  w1aw  ', 'W', '1', 'AW'],
    ['sm8aya/qrp', 'SM', '8', 'AYA/QRP'],
  ])('renders the parsed parts of %j', (text, prefix, digit, suffix) => {
    const element = renderCallsign(text);
    const shadow = element.shadowRoot;
    expect(shadow.querySelector('.cs-prefix').textContent).toBe(prefix);
    expect(shadow.querySelector('.cs-digit').textContent).toBe(digit);
    expect(shadow.querySelector('.cs-suffix').textContent).toBe(suffix);
    expect(element.textContent).toBe(text);
  });

  test.each(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])(
    'renders area digit %s',
    (digit) => {
      const shadow = renderCallsign(`W${digit}AW`).shadowRoot;
      expect(shadow.querySelector('.cs-digit').textContent).toBe(digit);
    }
  );

  test.each(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'P', 'M', 'MM', 'AM', 'QRP'])(
    'preserves the complete /%s portable indicator',
    (portable) => {
      const shadow = renderCallsign(`W1ABC/${portable}`).shadowRoot;
      expect(shadow.querySelector('.cs-prefix').textContent).toBe('W');
      expect(shadow.querySelector('.cs-digit').textContent).toBe('1');
      expect(shadow.querySelector('.cs-suffix').textContent).toBe(`ABC/${portable}`);
    }
  );

  test.each([
    '', ' ', 'WABC', 'W1', 'W1ABCD', 'ABCD1XYZ',
    'W,1ABC', 'W-1ABC', 'Contact W1AW today', 'W1AW!',
    'W1AW/34', 'W1AW/XYZ', 'W1AW/', '/W1AW', 'W1AW/P/3',
  ])('leaves malformed input %j unparsed rather than accepting a substring', (text) => {
    const element = renderCallsign(text);
    expect(element.shadowRoot.querySelector('.cs-wrapper')).toBeNull();
    expect(element.shadowRoot.querySelector('slot')).not.toBeNull();
    expect(element.textContent).toBe(text);
  });

  test.each([
    ['HB0ABC', 'LI', '🇱🇮'],
    ['HB9ABC', 'CH', '🇨🇭'],
    ['XX9ABC', 'MO', '🇲🇴'],
    ['XX1ABC', 'CN', '🇨🇳'],
    ['KD8ABC', 'US', '🇺🇸'],
    ['BB1ABC', 'CN', '🇨🇳'],
  ])('uses the most specific country allocation for %s', (text, country, flag) => {
    const renderedFlag = renderCallsign(text).shadowRoot.querySelector('.cs-flag');
    expect(renderedFlag.title).toBe(country);
    expect(renderedFlag.textContent).toBe(flag);
  });

  test('renders a structurally valid but unallocated manual call sign without a flag', () => {
    const shadow = renderCallsign('QQ1ABC').shadowRoot;
    expect(shadow.querySelector('.cs-prefix').textContent).toBe('QQ');
    expect(shadow.querySelector('.cs-flag')).toBeNull();
  });
});
