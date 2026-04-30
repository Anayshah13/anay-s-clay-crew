import { defineConfig, devices } from "@playwright/test";

const previewURL = "http://127.0.0.1:5199";

/**
 * E2E smoke tests against the production bundle (`vite preview`).
 * Local: run `npm run build` first; Playwright starts preview unless PLAYWRIGHT_SKIP_WEBSERVER is set.
 * CI: [.github/workflows/playwright.yml](.github/workflows/playwright.yml) starts preview in the background and sets PLAYWRIGHT_SKIP_WEBSERVER.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  timeout: 60_000,
  use: {
    baseURL: previewURL,
    trace: "on-first-retry",
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "Mobile Chrome", use: { ...devices["Pixel 5"] } },
    { name: "Mobile Safari", use: { ...devices["iPhone 12"] } },
  ],
  ...(process.env.PLAYWRIGHT_SKIP_WEBSERVER
    ? {}
    : {
        webServer: {
          command: `npm run preview -- --host 127.0.0.1 --port 5199 --strictPort`,
          url: previewURL,
          reuseExistingServer: true,
          timeout: 120_000,
        },
      }),
});
