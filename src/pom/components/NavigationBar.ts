import { Page, Locator, expect } from '@playwright/test';

export class Nav {
  // Declare locator types
  readonly searchInput: Locator;
  readonly searchResultItems: Locator;

  constructor(private readonly page: Page) {
    // Initialize locators after the page instance is available
    this.searchInput = page.locator('nav .oxd-input');
    this.searchResultItems = page.locator('nav ul.oxd-main-menu li span');
  }

  async expectLoaded() {
    await expect(this.searchInput).toBeVisible();
    const count = await this.searchResultItems.count();
    expect(count).toBeGreaterThanOrEqual(1);
  }
  
  async typeQuery(q: string) {
    await this.searchInput.fill('');
    await this.searchInput.pressSequentially(q);
    await this.page.waitForTimeout(150);
  }

  async clearQuery() {
    await this.searchInput.fill('');
    await this.page.waitForTimeout(100);
  }

  async waitForSearchResultsStable(timeoutMs = 3000, intervalMs = 150) {
    const deadline = Date.now() + timeoutMs;
    let prev = await this.searchResultItems.count();
    while (Date.now() < deadline) {
      await this.page.waitForTimeout(intervalMs);
      const curr = await this.searchResultItems.count();
      if (curr === prev) return; // stable
      prev = curr;
    }
    throw new Error(`Results did not stabilize within ${timeoutMs}ms`);
  }

  async getVisibleResultTexts(): Promise<string[]> {
    const texts = await this.searchResultItems.allTextContents();
    return texts.map(t => t.trim()).filter(Boolean);
  }
}
