import '../src/callsign.js';

describe('searchCallsigns performance', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('handles a large document without becoming noticeably slower', () => {
    const paragraphs = Array.from({ length: 250 }, (_, index) => {
      return `<p>Contact W1AW about ${index}, then SM8AYA and DL1ABC before wrapping up.</p>`;
    }).join('');

    document.body.innerHTML = paragraphs;

    const scriptElement = document.createElement('script');
    scriptElement.id = 'callsign-js';
    scriptElement.dataset.search = 'true';
    document.body.appendChild(scriptElement);

    const startTime = performance.now();
    window.Callsign.searchCallsigns();
    const duration = performance.now() - startTime;

    expect(document.querySelectorAll('call-sign').length).toBe(750);
    expect(duration).toBeLessThan(250);
  });
});
