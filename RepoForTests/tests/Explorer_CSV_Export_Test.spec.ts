import { test, expect } from '@playwright/test';

import dotenv from 'dotenv';
dotenv.config();

test('Export CSV Test', async ({ page }) => {
// Login to Axle QA account through google
  await page.goto('https://www.google.com/');
// Line added due to the default Language of the browser because of the ip.
  await page.click('text="English"');
  await page.waitForTimeout(1000);
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
//Login to HiTS Explorer
  await page.goto('https://ci.hits.axleresearch.net/');
  await page.waitForLoadState('load');
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForTimeout(2000);
  await page.getByText('Private Designated').click();
  await page.waitForLoadState('load');
  await page.waitForTimeout(3000);
  await page.getByText('Google').click();
  await page.waitForTimeout(2000);
  await page.locator('div').filter({ hasText: /^ExplorerExploration and Visualization tools for screening data\.$/ }).nth(1).click();
  await page.getByText('HiTS Explorer').click();

  // Verify that the user is logged in
   await expect(page).toHaveURL("https://ci.hits.axleresearch.net/hits-explorer")

    // Select a Project in the left panel
    await page.getByText('Small-cell lung cancer (SCLC)').click();
    await page.waitForSelector('.loader', { state: 'hidden' });

    //Click and open a project or assay
    await page.getByRole('row', { name: '  Prostate Cancer Matrix' }).getByRole('button').click();
    await page.getByText('LNcap 95 10X10 CTG 48hrs m-').click();
    
    //Wait for Central panel to load selected entry that contains the sample name 'Tariquidar'
    await page.waitForSelector('.loader', { state: 'hidden' });
    
    //Select a Sample from the central panel table
    await page.locator('.aggregation > td:nth-child(5)').first().click();
    await page.getByRole('row', { name: '1 default_aggregate 1' }).getByRole('checkbox').nth(1).click();

  //Export the selected Sample's data as a csv
    await page.getByTitle('Export Data').click();
    await page.getByRole('button', { name: 'Download' }).click();

    //wait for a selector that contains the substring 'Exporting Serials'
    await page.waitForSelector(':has-text("Exporting Serials")');
    //await page.getByText('Exporting Serials CSV - 11').click();
    const downloadPromise = page.waitForEvent('download');
    await page.getByLabel('Export Data').getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;
    //save the downloaded csv as 'CSV_Export_Test.csv' in the root directory
    await download.saveAs('CSV_Export_Test.csv');

});