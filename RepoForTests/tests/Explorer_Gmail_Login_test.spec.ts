import { test, expect } from '@playwright/test';

import dotenv from 'dotenv';
dotenv.config();

test('Explorer Gmail IDP Login Test', async ({ page }) => {

  await page.goto('https://www.google.com/');
  await page.getByLabel('Sign in').click();
  await page.waitForTimeout(2000);
  await page.getByLabel('Email or phone').fill(process.env.Explorer_USER);
  await page.waitForTimeout(1000);
  await page.getByLabel('Email or phone').press('Enter');
  await page.waitForTimeout(2000);
  await page.getByLabel('Enter your password').fill(process.env.Explorer_PASS);
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForLoadState('load');
  await page.waitForTimeout(5000);

  await page.goto('https://ci.hits.axleresearch.net/');
  await page.waitForLoadState('load');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForTimeout(2000);
  await page.getByText('Private Designated').click();
  await page.waitForLoadState('load');
  await page.waitForTimeout(3000);
  await page.getByText('Google').click();
  await page.waitForTimeout(2000);
  await page.locator('div').filter({ hasText: /^ExplorerExploration and Visualization tools for screening data\.$/ }).nth(1).click();
  await page.getByText('HiTS Explorer').click();

   // Verify that the user is logged in by takin a screenshot of the dashboard
   await expect(page).toHaveURL("https://ci.hits.axleresearch.net/hits-explorer")

  //Take screenshot of dashboard page as proof of successful navigation
  await page.screenshot({ path: 'Explorer_Dashboard_screenshot.png' });
});