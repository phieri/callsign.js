import '../src/callsign.js';

function insert(text) {
  const element = document.createElement('call-sign');
  element.textContent = text;
  document.body.appendChild(element);
  return element;
}

describe('custom element rendering', () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  test('renders programmatically created elements after their content is set', () => {
    const element = insert('W1AW');
    const wrapper = element.shadowRoot.querySelector('.cs-wrapper');
    expect(wrapper.textContent).toBe('🇺🇸W1AW');
    expect(wrapper.classList.contains('monospace')).toBe(true);
    expect(wrapper.getAttribute('role')).toBe('img');
    expect(wrapper.getAttribute('aria-label')).toBe('Whiskey One Alfa Whiskey');
    expect(wrapper.title).toBe('Whiskey One Alfa Whiskey');
    expect(wrapper.querySelector('.cs-flag').getAttribute('aria-hidden')).toBe('true');
  });

  test.each(['0', '3', 'P', 'M', 'MM', 'AM', 'QRP'])('preserves /%s in rendered content', (portable) => {
    const element = insert(`W1AW/${portable}`);
    expect(element.shadowRoot.querySelector('.cs-suffix').textContent).toBe(`AW/${portable}`);
  });

  test('announces portable suffix separators in the phonetic label and tooltip', () => {
    const element = insert('W1AW/P');
    const wrapper = element.shadowRoot.querySelector('.cs-wrapper');
    expect(wrapper.getAttribute('aria-label')).toBe('Whiskey One Alfa Whiskey Slash Papa');
    expect(wrapper.title).toBe('Whiskey One Alfa Whiskey Slash Papa');
  });

  test('updates when connected text or nested text changes', async () => {
    const element = insert('W1AW');
    element.textContent = 'SM8AYA/5';
    await Promise.resolve();
    expect(element.shadowRoot.querySelector('.cs-wrapper').textContent).toBe('🇸🇪SM8AYA/5');
    element.firstChild.data = 'DL1ABC';
    await Promise.resolve();
    expect(element.shadowRoot.querySelector('.cs-wrapper').textContent).toBe('🇩🇪DL1ABC');
  });

  test('handles initially empty elements and invalid content without hiding it', async () => {
    const element = insert('');
    element.textContent = 'W1AW';
    await Promise.resolve();
    expect(element.shadowRoot.querySelector('.cs-wrapper')).not.toBeNull();
    element.textContent = 'Contact W1AW today';
    await Promise.resolve();
    expect(element.shadowRoot.querySelector('.cs-wrapper')).toBeNull();
    expect(element.shadowRoot.querySelector('slot')).not.toBeNull();
    expect(element.textContent).toBe('Contact W1AW today');
  });

  test('reconnects without duplicate shadow roots or stale content', () => {
    const element = insert('W1AW');
    element.remove();
    element.textContent = 'SM8AYA';
    document.body.appendChild(element);
    expect(element.shadowRoot.querySelectorAll('.cs-wrapper')).toHaveLength(1);
    expect(element.shadowRoot.querySelector('.cs-wrapper').textContent).toBe('🇸🇪SM8AYA');
  });

  test.each([
    ['KD8ABC', 'US'], ['HB0ABC', 'LI'], ['HB9ABC', 'CH'],
    ['XX9ABC', 'MO'], ['VR2ABC', 'HK'], ['FR1ABC', 'RE'],
    ['3D2XYZ', 'FJ'], ['3DA0ABC', 'SZ'], ['XJ1ABC', 'CA'],
    ['TN1ABC', 'CG'], ['TS1ABC', 'TN'], ['TY1ABC', 'BJ'],
    ['5X1ABC', 'UG'], ['YN1ABC', 'NI'], ['HN1ABC', 'IQ']
  ])('resolves the most specific flag for %s', (call, iso) => {
    expect(insert(call).shadowRoot.querySelector('.cs-flag').title).toBe(iso);
  });
});

describe('safe document search', () => {
  afterEach(() => document.body.replaceChildren());

  test('renders results and remains idempotent', () => {
    document.body.innerHTML = '<p>(W1AW), SM8AYA/5; DL1ABC/P.</p>';
    window.Callsign.searchCallsigns();
    window.Callsign.searchCallsigns();
    const elements = [...document.querySelectorAll('call-sign')];
    expect(elements.map(element => element.textContent)).toEqual(['W1AW', 'SM8AYA/5', 'DL1ABC/P']);
    expect(elements.every(element => element.shadowRoot.querySelector('.cs-wrapper'))).toBe(true);
    expect(document.querySelector('p').textContent).toBe('(W1AW), SM8AYA/5; DL1ABC/P.');
  });

  test('does not match fragments of words, identifiers or unsupported slash formats', () => {
    const text = 'helloW1AW éW1AW W1AWé e\u0301W1AW W1AW\u0301 _W1AW W1AW_ W1AW/123 EA8/W1AW W1AW/XYZ W1AWXY';
    document.body.textContent = text;
    window.Callsign.searchCallsigns();
    expect(document.querySelector('call-sign')).toBeNull();
    expect(document.body.textContent).toBe(text);
  });

  test('leaves protected subtrees, form values and editable content untouched', () => {
    document.body.innerHTML = `
      <pre><span>W1AW</span></pre><code><b>W1AW</b></code>
      <textarea>W1AW</textarea><select><option>W1AW</option></select>
      <div contenteditable><span>W1AW</span></div>
      <svg><text>W1AW</text></svg><math><mi>W1AW</mi></math>
      <call-sign><b>W1AW</b></call-sign><p>W1AW</p>`;
    window.Callsign.searchCallsigns();
    expect(document.querySelectorAll('call-sign')).toHaveLength(2);
    expect(document.querySelector('call-sign call-sign')).toBeNull();
    expect(document.querySelector('textarea').value).toBe('W1AW');
    expect(document.querySelector('p > call-sign')).not.toBeNull();
  });

  test('preserves surrounding DOM identity and event handlers', () => {
    document.body.innerHTML = '<p><a href="#contact">W1AW</a></p>';
    const link = document.querySelector('a');
    let clicked = false;
    link.addEventListener('click', () => { clicked = true; });
    window.Callsign.searchCallsigns();
    expect(document.querySelector('a')).toBe(link);
    link.click();
    expect(clicked).toBe(true);
  });
});
