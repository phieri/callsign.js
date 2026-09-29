import '../src/callsign.js';

const { Callsign } = window;

beforeAll(() => {
  if (!customElements.get('call-sign')) {
    document.dispatchEvent(new Event('DOMContentLoaded'));
  }
});

afterEach(() => document.body.replaceChildren());

function findCallsigns(text) {
  document.body.textContent = text;
  Callsign.searchCallsigns();
  expect(document.body.textContent).toBe(text);
  return Array.from(document.querySelectorAll('call-sign'), (element) => element.textContent);
}

describe('Callsign.searchCallsigns with real prefix allocations', () => {
  test.each([
    ['I heard W1AW today', ['W1AW']],
    ['Contact K2ABC tomorrow', ['K2ABC']],
    ['N3XYZ is on air', ['N3XYZ']],
    ['AA1AA called CQ; worked AB2CD today', ['AA1AA', 'AB2CD']],
    ['KD8ABC KK2XYZ NQ1ABC WB2XYZ', ['KD8ABC', 'KK2XYZ', 'NQ1ABC', 'WB2XYZ']],
    ['SM8AYA from Sweden; DL1ABC in Germany', ['SM8AYA', 'DL1ABC']],
    ['G0XYZ from UK; JA1XYZ from Japan', ['G0XYZ', 'JA1XYZ']],
    ['W1ABC/3 portable; SM8AYA/5 on vacation', ['W1ABC/3', 'SM8AYA/5']],
    ['9V1ABC W1A K2B VK2ABC', ['9V1ABC', 'W1A', 'K2B', 'VK2ABC']],
    ['BB1ABC XX1XYZ ZZ1ABC ZX2XYZ are allocated', ['BB1ABC', 'XX1XYZ', 'ZZ1ABC', 'ZX2XYZ']],
    ['Q1ABC X2XYZ QQ3ABC QX1ABC are unallocated', []],
    ['W1AW worked QQ1ABC and SM8AYA but not QX2XYZ', ['W1AW', 'SM8AYA']],
    ['Valid: W1AW K2ABC Invalid: Q1XYZ X2ABC Real: DL1ABC', ['W1AW', 'K2ABC', 'DL1ABC']],
    ['Worked W1AW on 20m, then SM8AYA on 40m. QSO with DL1ABC at 1800z.', ['W1AW', 'SM8AYA', 'DL1ABC']],
    ['Worked: W1AW N3XYZ G0ABC JA1XYZ VK2DEF today', ['W1AW', 'N3XYZ', 'G0ABC', 'JA1XYZ', 'VK2DEF']],
    ['', []],
    ['No stations in this text.', []],
  ])('searches %j', (text, expected) => {
    expect(findCallsigns(text)).toEqual(expected);
  });

  test('renders every inserted element, including specific territory flags', () => {
    expect(findCallsigns('W1AW HB0ABC XX9ABC')).toEqual(['W1AW', 'HB0ABC', 'XX9ABC']);
    const elements = Array.from(document.querySelectorAll('call-sign'));
    expect(elements.map((element) => element.shadowRoot.querySelector('.cs-flag').title))
      .toEqual(['US', 'LI', 'MO']);
    expect(elements[0].shadowRoot.querySelector('.cs-wrapper').getAttribute('aria-label'))
      .toBe('Whiskey One Alfa Whiskey');
  });

  test('preserves surrounding markup, attributes, and node identity', () => {
    document.body.innerHTML = '<p id="log">Before <em title="W1AW">W1AW</em>, then K2ABC.</p>';
    const paragraph = document.querySelector('p');
    const emphasis = document.querySelector('em');
    Callsign.searchCallsigns();
    expect(document.querySelector('p')).toBe(paragraph);
    expect(document.querySelector('em')).toBe(emphasis);
    expect(emphasis.title).toBe('W1AW');
    expect(paragraph.textContent).toBe('Before W1AW, then K2ABC.');
    expect(emphasis.querySelector('call-sign').textContent).toBe('W1AW');
    expect(paragraph.querySelectorAll('call-sign')).toHaveLength(2);
  });

  test('does not nest wrappers or replace existing call signs on repeated search', () => {
    document.body.innerHTML = '<call-sign>W1AW</call-sign> K2ABC';
    const original = document.querySelector('call-sign');
    Callsign.searchCallsigns();
    const inserted = document.querySelectorAll('call-sign')[1];
    Callsign.searchCallsigns();
    expect(Array.from(document.querySelectorAll('call-sign'))).toEqual([original, inserted]);
    expect(document.querySelector('call-sign call-sign')).toBeNull();
    expect(document.body.textContent).toBe('W1AW K2ABC');
  });

  test.each(['script', 'style', 'code', 'pre', 'textarea', 'select', 'option', 'noscript', 'template', 'svg', 'math'])(
    'skips text in protected %s elements',
    (tag) => {
      document.body.innerHTML = `<${tag}>W1AW</${tag}><p>K2ABC</p>`;
      Callsign.searchCallsigns();
      expect(Array.from(document.querySelectorAll('call-sign'), (element) => element.textContent))
        .toEqual(['K2ABC']);
    }
  );

  test.each([
    '<pre><span>W1AW</span></pre>',
    '<code><strong>W1AW</strong></code>',
    '<div contenteditable="true"><span>W1AW</span></div>',
    '<div contenteditable=""><span>W1AW</span></div>',
    '<div contenteditable="plaintext-only"><span>W1AW</span></div>',
    '<div contenteditable="true"><span contenteditable="false">W1AW</span></div>',
    '<call-sign><span>W1AW</span></call-sign>',
  ])('respects protected ancestors in %s', (markup) => {
    document.body.innerHTML = markup;
    const original = document.body.innerHTML;
    Callsign.searchCallsigns();
    expect(document.body.innerHTML).toBe(original);
  });

  test('allows text explicitly marked noneditable outside protected ancestors', () => {
    document.body.innerHTML = '<div contenteditable="false"><span>W1AW</span></div>';
    Callsign.searchCallsigns();
    expect(document.querySelector('span > call-sign').textContent).toBe('W1AW');
  });
});
