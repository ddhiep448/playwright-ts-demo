import { Page, expect, Locator } from '@playwright/test';
import { DashboardPage } from '@pages/DashboardPage';

export type LoginExpectation = 'success' | 'invalid' | 'required';

export class LoginPage {
  // Declare locator types
  readonly username: Locator;
  readonly password: Locator;
  readonly submitBtn: Locator;
  readonly alert: Locator;

  constructor(private readonly page: Page) {
    // Initialize locators after the page instance is available
    this.username  = page.getByPlaceholder('Username');
    this.password  = page.getByPlaceholder('Password');
    this.submitBtn = page.getByRole('button', { name: /^login$/i });
    this.alert     = page.locator('[role="alert"]');
  }

  async expectLoaded() {
    await expect(this.username).toBeVisible();
    await expect(this.password).toBeVisible();
    await expect(this.submitBtn).toBeVisible();
  }

  async access() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com');
    await expect(this.username).toBeVisible();
  }

  async loginUI(user: string, pass: string, submitWithEnter = false) {
    await this.username.fill(user ?? '');
    await this.password.fill(pass ?? '');
    if (submitWithEnter) await this.password.press('Enter');
    else await this.submitBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async expectInvalidCredentials() {
    await expect(this.page.getByText(/Invalid credentials/i)).toBeVisible();
  }

  async expectFieldRequired() {
    await expect(this.page.getByText(/Required/i)).toBeVisible();
  }

  async assertLogin(expectation: LoginExpectation) {
    const lp = this;
    const { page } = this;
    const assertByExpectation: Record<string, () => Promise<void>> = {
      success: async () => {
        const dash = new DashboardPage(page);
        await dash.expectLoaded();
        await expect(page).toHaveURL(/dashboard/i);
      },
      invalid: async () => lp.expectInvalidCredentials(),
      required: async () => lp.expectFieldRequired(),
    };
    const assertFn = assertByExpectation[expectation] ?? lp.expectInvalidCredentials;
    await assertFn();
  }
}