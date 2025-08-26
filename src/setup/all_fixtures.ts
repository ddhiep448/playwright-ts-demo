// all_fixtures.ts
import { test as base, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';

type TestFixtures = {
  sharedPage: Page;
};

type WorkerFixtures = {
  sharedContext: BrowserContext;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
  // Worker-scoped: login 1 lần cho toàn bộ tests trong worker
  sharedContext: [async ({ browser }, use) => {
    const context = await browser.newContext();

    // Login 1 lần trên tab tạm
    const page = await context.newPage();
    const login = new LoginPage(page);
    await login.access(); // nên dùng "/" bên trong LoginPage để tận dụng baseURL
    await login.loginUI(process.env.ADMIN_USERNAME!, process.env.ADMIN_PASSWORD!);
    // đảm bảo đã vào Dashboard
    await page.waitForURL(/\/dashboard\/index/i, { timeout: 15_000 });
    await page.close();

    // Cho test dùng
    await use(context);
    await context.close();
  }, { scope: 'worker', auto: false }],

  // ➜ Test-scoped: mỗi test mở 1 tab mới từ context đã đăng nhập
  sharedPage: async ({ sharedContext }, use) => {
    const page = await sharedContext.newPage();
    await use(page);
    await page.close();
  },
});
