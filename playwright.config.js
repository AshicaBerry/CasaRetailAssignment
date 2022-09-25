const { devices } = require('@playwright/test');

const config = {
  retries: 0,
  testMatch: ['**/tests/*.spec.js'],
  timeout: 90 * 1000,
  expect: {
    timeout: 90 * 1000,
  },
  fullyParallel: true,
  use: {
    trace: 'on-first-retry',
    viewport: {
      width: 1280,
      height: 720,
    },
    ignoreHTTPSErrors: true,
    video: 'on',
    screenshot: 'on',
    headless: false,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
  reporter: [
    [
      'json',
      {
        outputFile: '/tmp/codingresults.json',
      },
    ],

    ['html', { outputFolder: '/tmp/coding-test-report', open: 'never' }],
  ],
};

module.exports = config;
