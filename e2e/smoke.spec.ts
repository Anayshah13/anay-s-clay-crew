import { test, expect } from "@playwright/test";

function attachPageErrorCollector(page: import("@playwright/test").Page): string[] {
  const errors: string[] = [];
  page.on("pageerror", (err) => {
    errors.push(err.message);
  });
  return errors;
}

test.describe("production smoke (vite preview)", () => {
  test("home renders without uncaught page errors", async ({ page }) => {
    const errors = attachPageErrorCollector(page);
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(page.locator("#root")).not.toBeEmpty({ timeout: 20_000 });
    const rootText = await page.locator("#root").innerText({ timeout: 25_000 });
    expect(rootText.length).toBeGreaterThan(80);

    await page.waitForTimeout(400);
    expect(errors, errors.join("\n")).toEqual([]);
  });

  test("projects route renders gallery heading", async ({ page }) => {
    const errors = attachPageErrorCollector(page);
    await page.goto("/projects", { waitUntil: "domcontentloaded" });

    await expect(page.getByRole("heading", { name: /all projects/i })).toBeVisible({
      timeout: 20_000,
    });

    await page.waitForTimeout(400);
    expect(errors, errors.join("\n")).toEqual([]);
  });

  test("unknown route shows 404 UI", async ({ page }) => {
    await page.goto("/__playwright_missing_route__", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "404" })).toBeVisible({ timeout: 15_000 });
  });

  test("index.html loads vendor-react bundle (Radix co-located)", async ({ page }) => {
    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response?.ok()).toBeTruthy();
    const html = await page.content();
    expect(html).toMatch(/vendor-react[^"']*\.js/);
    expect(html).not.toMatch(/vendor-radix/);
  });
});
