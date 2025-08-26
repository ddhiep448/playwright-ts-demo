import { test } from '@fixtures';
import { DashboardPage } from '@pages/DashboardPage';
import { sidebarSearchData, assertSidebarSearch } from '@data/navSearchData';

test.describe('Navigation Search', () => {
  test.beforeEach(async ({ sharedPage }) => {
    const dp = new DashboardPage(sharedPage);
    await dp.access();
    await dp.expectLoaded();
  });

  for (const testCase of sidebarSearchData) {
    test(testCase.name, async ({ sharedPage }) => {
      const dp = new DashboardPage(sharedPage);
      await dp.nav.expectLoaded();
      await dp.nav.typeQuery(testCase.query);
      await dp.nav.waitForSearchResultsStable();
      const texts = await dp.nav.getVisibleResultTexts();
      assertSidebarSearch(texts, testCase.expect);
    });
  }
});
