/**
 * Integration tests for src/callsign.js loaded via jsdom.
 * Verifies phonetics, prefix validation, and DOM search behaviour
 * using the actual module rather than inline copies.
 */

import '../src/callsign.js';

describe('Callsign module (loaded via jsdom)', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });
  test('getPhonetics returns expected phonetic expansion', () => {
    expect(window.Callsign.getPhonetics('W1AW')).toBe('Whiskey One Alfa Whiskey');
    expect(window.Callsign.getPhonetics('SM8AYA')).toBe('Sierra Mike Eight Alfa Yankee Alfa');
  });

  test('getPhonetics filters out characters not in the phonetic table', () => {
    // Slash is not in the phonetic table; it should be silently dropped
    const result = window.Callsign.getPhonetics('W1ABC/3');
    expect(result).not.toContain('undefined');
    expect(result).toBe('Whiskey One Alfa Bravo Charlie Tree');
  });

  test('isValidPrefix returns true for known prefixes', () => {
    expect(window.Callsign.isValidPrefix('W')).toBe(true);   // US
    expect(window.Callsign.isValidPrefix('DL')).toBe(true);  // Germany
    expect(window.Callsign.isValidPrefix('SM')).toBe(true);  // Sweden
  });

  test('isValidPrefix returns false for unknown prefixes', () => {
    expect(window.Callsign.isValidPrefix('ZZZ')).toBe(false);
    expect(window.Callsign.isValidPrefix('')).toBe(false);
  });

  test('searchCallsigns replaces a text node containing a call sign with a call-sign element', () => {
    document.body.innerHTML = '<p>W1AW is the ARRL station.</p>';
    window.Callsign.searchCallsigns();
    const el = document.querySelector('call-sign');
    expect(el).toBeTruthy();
    expect(el.textContent).toBe('W1AW');
  });

  test('searchCallsigns leaves surrounding text intact', () => {
    document.body.innerHTML = '<p>Contact W1AW for more info.</p>';
    window.Callsign.searchCallsigns();
    const p = document.querySelector('p');
    expect(p.textContent).toBe('Contact W1AW for more info.');
    expect(document.querySelector('call-sign').textContent).toBe('W1AW');
  });
});
