// Enable support for absolute import paths based on tsconfig.json
import 'tsconfig-paths/register';
import { defineConfig, devices } from '@playwright/test';


// Main Playwright configuration
export default defineConfig({
  globalSetup: '@globalSetup',
  // Directory that contains all test files
  testDir: './tests',

  // Maximum time one test can run (60s)
  timeout: 60 * 1000,

  // Default timeout for expect() assertions (10s)
  expect: { timeout: 10 * 1000 },

  // Run tests fully in parallel
  fullyParallel: true,

  // Number of parallel workers (default = CPU cores if not set)
  workers: 2, 

  // Reporters: show line output, HTML report, and list format
  reporter: [
    ['html', { open: 'never' }],       // generate HTML report, don’t auto open
    ['list']                           // verbose list format
  ],

  // Default settings for all tests
  use: {
    headless: true,                     // run browsers in headless mode
    baseURL: process.env.BASE_URL,      // global base URL
    screenshot: 'only-on-failure',      // take screenshots only if test fails
    video: 'retain-on-failure',         // keep video only for failed tests
    // trace: 'on-first-retry',         // capture trace if test fails and retries
    actionTimeout: 15_000,              // timeout for single UI action (15s)
    navigationTimeout: 20_000,          // timeout for navigation/loadState (20s)
    viewport: { width: 1920, height: 1080 } // default browser window size
  },

  // Define projects (e.g. different browsers/devices)
  projects: [
    {
      name: 'chromium',                     // project name shown in reports
      use: { ...devices['Desktop Chrome'] } // emulate desktop Chrome
    }
  ],

  // Number of retries if a test fails (0 = no retry)
  retries: 0,
});
