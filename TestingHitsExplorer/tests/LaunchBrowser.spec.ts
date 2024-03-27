import {test } from "@playwright/test"
test("Launch Browser", async ({page}) => {
    await page.goto("https://playwright.dev/")
    await page.screenshot({ path: `playwright_browser_snapshot.png` })
})