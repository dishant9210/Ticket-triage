const { classify } = require('../src/analyzer/classifier');

describe('Classifier — Category Detection', () => {
  test('detects Billing category', () => {
    const result = classify('I was overcharged on my invoice last month');
    expect(result.category).toBe('Billing');
  });

  test('detects Technical category', () => {
    const result = classify('The app keeps crashing and showing error 500');
    expect(result.category).toBe('Technical');
  });

  test('detects Account category', () => {
    const result = classify('I cannot login, my account seems locked');
    expect(result.category).toBe('Account');
  });

  test('detects Feature Request category', () => {
    const result = classify('Would love a dark mode feature suggestion');
    expect(result.category).toBe('Feature Request');
  });

  test('falls back to Other when no keywords match', () => {
    const result = classify('Hello there, just checking in');
    expect(result.category).toBe('Other');
  });
});

describe('Classifier — Priority & Urgency', () => {
  test('assigns P0 for outage', () => {
    const result = classify('The entire system is down and there is an outage');
    expect(result.priority).toBe('P0');
  });

  test('assigns P1 for urgent keyword', () => {
    const result = classify('This is urgent, the login is broken');
    expect(result.priority).toBe('P1');
  });

  test('assigns P3 for feature suggestion', () => {
    const result = classify('Would love a feature to export as PDF');
    expect(result.priority).toBe('P3');
  });

  test('isUrgent true when urgency keyword present', () => {
    const result = classify('Need this fixed asap please');
    expect(result.isUrgent).toBe(true);
  });

  test('isUrgent false for calm message', () => {
    const result = classify('Can you help me reset my password when convenient');
    expect(result.isUrgent).toBe(false);
  });
});

describe('Classifier — Custom Security Rule', () => {
  test('flags security breach as P0', () => {
    const result = classify('I think my account was hacked and compromised');
    expect(result.priority).toBe('P0');
    expect(result.securityFlag).toBe(true);
    expect(result.isUrgent).toBe(true);
  });

  test('flags phishing attempt as security threat', () => {
    const result = classify('I received a phishing email pretending to be you');
    expect(result.securityFlag).toBe(true);
    expect(result.priority).toBe('P0');
  });

  test('non-security ticket does not get security flag', () => {
    const result = classify('I need a refund for my last payment');
    expect(result.securityFlag).toBe(false);
  });
});

describe('Classifier — Confidence & Keywords', () => {
  test('confidence between 0 and 1', () => {
    const result = classify('urgent outage crash error down broken');
    expect(result.confidence).toBeGreaterThan(0);
    expect(result.confidence).toBeLessThanOrEqual(1);
  });

  test('extracts keywords correctly', () => {
    const result = classify('I need a refund on my invoice');
    expect(result.keywords).toContain('refund');
    expect(result.keywords).toContain('invoice');
  });
});