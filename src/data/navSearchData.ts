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

export function assertSidebarSearch(visibleResultTexts: string[], expectation: DataSearchExpectation) {
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

export const sidebarSearchData: SearchCase[] = [
  { name: 'SRH-001 - Exact match with single word - @sidebarSearch @regression', query: 'Dashboard', expect: { type: 'has', items: ['Dashboard'] } },

  { name: 'SRH-002 - Exact match with multiple word - @sidebarSearch @regression @smoke', query: 'My Info', expect: { type: 'has', items: ['My Info'] } },

  { name: 'SRH-003 - Partial match with single word - @sidebarSearch @regression', query: 'Recr', expect: { type: 'has', items: ['Recruitment'] } },

  { name: 'SRH-004 - Partial match with multiple words - @sidebarSearch @regression @smoke', query: 'My In', expect: { type: 'has', items: ['My Info'] } },

  { name: 'SRH-005 - Lowercase search - @sidebarSearch @regression', query: 'admin', expect: { type: 'has', items: ['Admin'] } },

  { name: 'SRH-006 - Uppercase search - @sidebarSearch @regression', query: 'ADMIN', expect: { type: 'has', items: ['Admin'] } },

  { name: 'SRH-101 - Leading/trailing spaces in query - @sidebarSearch', query: '   My   ', expect: { type: 'noItem' } },

  { name: 'SRH-102 - Very long query (length boundary) - @sidebarSearch', query: 'x'.repeat(512), expect: { type: 'noItem' } },

  { name: 'SRH-103 - Non-Latin characters - @sidebarSearch', query: 'テスト中文', expect: { type: 'noItem' } },

  { name: 'SRH-104 - Special characters and symbols - @sidebarSearch', query: '!@#$%^&*()_+=[]{}|;:\'",.<>/?~`', expect: { type: 'noItem' } },

  { name: 'SRH-201 - Empty query submission - @smoke @regression @smoke', query: '', expect: { type: 'atLeast', count: 12 } },

  { name: 'SRH-202 - No results state - @sidebarSearch @regression @smoke', query: 'THIS_SHOULD_NOT_MATCH_ANYTHING_12345', expect: { type: 'noItem' } },
];
