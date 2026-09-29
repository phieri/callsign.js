import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/callsign.js', import.meta.url), 'utf8');
let frame;

function load(attributes = '', content = '') {
  frame = document.createElement('iframe');
  frame.src = '/';
  document.body.appendChild(frame);
  const doc = frame.contentDocument;
  doc.appendChild(doc.createElement('html'));
  doc.documentElement.innerHTML = '<head></head><body></body>';
  doc.head.innerHTML = `<script id="callsign-js" src="/assets/callsign.js" ${attributes}></script>`;
  doc.body.innerHTML = content;
  frame.contentWindow.eval(source);
  doc.dispatchEvent(new frame.contentWindow.Event('DOMContentLoaded'));
  const element = doc.createElement('call-sign');
  element.textContent = 'W1AW';
  doc.body.appendChild(element);
  return element.shadowRoot;
}

afterEach(() => frame?.remove());

test('resolves default stylesheet beside the script', () => {
  const shadow = load();
  expect(shadow.querySelector('link').href).toBe('http://localhost/assets/callsign.css');
});

test('respects explicit page-relative stylesheet and all disabled rendering options', () => {
  const shadow = load('data-css-path="/theme.css" data-flag="false" data-monospace="false" data-phonetic="false"');
  expect(shadow.querySelector('link').href).toBe('http://localhost/theme.css');
  expect(shadow.querySelector('.cs-flag')).toBeNull();
  const wrapper = shadow.querySelector('.cs-wrapper');
  expect(wrapper.classList.contains('monospace')).toBe(false);
  expect(wrapper.hasAttribute('aria-label')).toBe(false);
  expect(wrapper.hasAttribute('role')).toBe(false);
  expect(wrapper.querySelector('[aria-hidden]')).toBeNull();
});

test.each([
  'javascript:alert(1)', 'java&#10;script:alert(1)', 'data:text/css,body{}',
  '//example.com/theme.css', 'https://example.com/theme.css',
  '\\\\example.com/theme.css', 'file:///theme.css', 'https:example.com/theme.css'
])('rejects unsafe or cross-origin stylesheet override %s', (path) => {
  expect(load(`data-css-path="${path}"`).querySelector('link').href)
    .toBe('http://localhost/assets/callsign.css');
});

test('data-search initializes rendered elements in the document', () => {
  load('data-search="true"', '<p>W1AW</p><call-sign>SM8AYA</call-sign>');
  const document = frame.contentDocument;
  expect(document.querySelector('p call-sign').shadowRoot.querySelector('.cs-flag').title).toBe('US');
  expect(document.querySelector('body > call-sign').shadowRoot.querySelector('.cs-flag').title).toBe('SE');
});

test('search is disabled by default', () => {
  load('', '<p>W1AW</p>');
  expect(frame.contentDocument.querySelector('p call-sign')).toBeNull();
});
