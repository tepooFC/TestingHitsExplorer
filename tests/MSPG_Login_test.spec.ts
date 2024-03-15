import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

test('MSPG Login Test', async ({ page }) => {
  await page.goto('https://ci.hits.axleresearch.net/');

  //Login to HiTS via Google Portal
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByText('Public').click();
  await page.getByText('Google').click();
  await page.getByLabel('Email or phone').click();
  await page.getByLabel('Email or phone').fill(process.env.HITS_USER);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('Enter your password').click();
  await page.getByLabel('Enter your password').fill(process.env.HITS_PASS);
await page.getByRole('button', { name: 'Next' }).click();
await page.waitForLoadState('load'); // waits for 'load' event

//Navigate to MSPG web app dashboard
await page.waitForSelector('text="A collection of tools to register, query, and manage the Assay plate experiments."');
await page.locator('text="A collection of tools to register, query, and manage the Assay plate experiments."').click();
await page.waitForLoadState('load');
await page.waitForSelector('text="Matrix Source Plate Generator"');
await page.locator('text="Matrix Source Plate Generator"').click();
await page.waitForSelector('text="Matrix Jobs"');

//Take screenshot of dashboard page as proof of successful navigation
  await page.screenshot({ path: 'MSPG_Dashboard_screenshot.png' });
});