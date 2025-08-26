import { expect } from '@playwright/test';

export type DataSearchExpectation =
  | { type: 'has'; items: string[] }
  | { type: 'atLeast'; count: number }
  | { type: 'noItem' };

export type SearchCase = {
  name: string;
  query: string;
  expect: DataSearchExpectation;
};

export function assertNavSearch(visibleResultTexts: string[], expectation: DataSearchExpectation) {
  if (expectation.type === 'has') {
    for (const item of expectation.items) {
      const ok = visibleResultTexts.some(t => t.trim().toLowerCase() === item.trim().toLowerCase());
      expect(ok, `Expected results to contain "${item}" (case-insensitive) among [${visibleResultTexts.join(', ')}]`).toBeTruthy();
    }
  } else if (expectation.type === 'noItem') {
    expect(visibleResultTexts.length, `Expected no results, but got [${visibleResultTexts.join(', ')}]`).toBe(0);
  } else if (expectation.type === 'atLeast') {
    expect(visibleResultTexts.length, `Expected at least ${expectation.count} results, but got ${visibleResultTexts.length} ([${visibleResultTexts.join(', ')}])`)
      .toBeGreaterThanOrEqual(expectation.count);
  }
}

export const navSearchData: SearchCase[] = [
  { name: 'Exact match with single word - @navSearch @regression', query: 'Dashboard', expect: { type: 'has', items: ['Dashboard'] } },

  { name: 'Exact match with multiple word - @navSearch @regression @smoke', query: 'My Info', expect: { type: 'has', items: ['My Info'] } },

  { name: 'Partial match with single word - @navSearch @regression', query: 'Recr', expect: { type: 'has', items: ['Recruitment'] } },

  { name: 'Partial match with multiple words - @navSearch @regression @smoke', query: 'My in', expect: { type: 'has', items: ['My Info'] } },

  { name: 'Case-insensitive search - @navSearch @regression', query: 'admin', expect: { type: 'has', items: ['Admin'] } },

  { name: 'Leading/trailing spaces in query - @navSearch', query: '   My   ', expect: { type: 'noItem' } },

  { name: 'Very long query (length boundary) - @navSearch', query: 'x'.repeat(512), expect: { type: 'noItem' } },

  { name: 'Non-Latin characters / IME composition - @navSearch', query: 'テスト中文 thử', expect: { type: 'noItem' } },

  { name: 'Special characters and symbols - @navSearch', query: '!@#$%^&*()_+=[]{}|;:\'",.<>/?~`', expect: { type: 'noItem' } },

  { name: 'Empty query submission - @smoke @regression @smoke', query: '', expect: { type: 'atLeast', count: 12 } },

  { name: 'No results state - @navSearch @regression @smoke', query: 'THIS_SHOULD_NOT_MATCH_ANYTHING_12345', expect: { type: 'noItem' } },
];
