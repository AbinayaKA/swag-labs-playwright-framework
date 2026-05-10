import { defineConfig, devices } from '@playwright/test';
import { currentEnv } from "./src/configs/env.manager";

export default defineConfig({
  testDir: './src/tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use */
  reporter: [['html'], ['list']],
  /* Shared settings for all the projects below */
  use: {
    /* Base URL to use in actions like `await page.goto('')` */
    baseURL: currentEnv.baseUrl,

    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',

    /* Capture screenshot when there is a failure */
    screenshot: 'only-on-failure',

    /* Capture video when there is a failure */
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: /.*auth\.setup\.ts/,
    },
    {
      name: 'saucedemo',
      use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/user.json' },
      testMatch: /.*\.spec\.ts/,
      dependencies: ['setup']
    },
  ]
});
