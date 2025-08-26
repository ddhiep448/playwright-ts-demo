import { test } from '@fixtures';
import { DashboardPage } from '@pages/DashboardPage';
import { navSearchData, assertNavSearch } from '@data/navSearchData';

test.describe('Navigation Search', () => {
  test.beforeEach(async ({ sharedPage }) => {
    const dp = new DashboardPage(sharedPage);
    await dp.access();
    await dp.expectLoaded();
  });

  for (const testCase of navSearchData) {
    test(testCase.name, async ({ sharedPage }) => {
      const dp = new DashboardPage(sharedPage);
      await dp.nav.expectLoaded();
      await dp.nav.typeQuery(testCase.query);
      await dp.nav.waitForSearchResultsStable();
      const texts = await dp.nav.getVisibleResultTexts();
      assertNavSearch(texts, testCase.expect);
    });
  }
});
