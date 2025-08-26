import { test } from '@fixtures';
import { LoginPage } from '@pages/LoginPage';
import { loginCases } from '@data/loginData';

test.describe('OrangeHRM Login', () => {
  for (const testCase of loginCases) {
    test(testCase.name, async ({ page }) => {
      const lp = new LoginPage(page);
      await lp.access();
      await lp.loginUI(testCase.username, testCase.password, !!testCase.submitWithEnter);
      await lp.assertLogin(testCase.expect);
    });
  }
});
