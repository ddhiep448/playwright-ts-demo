import { Page, expect, Locator } from '@playwright/test';
import { Nav } from '@components/NavigationBar';

export class DashboardPage {
  // Declare locator types
  readonly header: Locator;
  readonly userMenu: Locator;
  readonly userDropdown: Locator;
  readonly logoutLink: Locator;
  readonly nav: Nav;

  constructor(private readonly page: Page) {
    // Initialize locators after the page instance is available
    this.header = page.getByRole('heading', { name: /Dashboard/i });
    this.userMenu = page.locator('p.oxd-userdropdown-name');
    this.userDropdown = page.locator('.oxd-userdropdown');
    this.logoutLink = page.getByRole('menuitem', { name: /Logout/i });

    // Composition: include Navigation Bar
    this.nav = new Nav(page);
  }

  async expectLoaded() {
    await expect(this.header).toBeVisible();
    await expect(this.page).toHaveURL(/dashboard/i);
  }

  async access() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    await this.page.waitForLoadState('load');
    await this.expectLoaded();
  }
}
