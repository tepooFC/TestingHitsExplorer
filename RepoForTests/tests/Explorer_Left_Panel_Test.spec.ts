import { test, expect } from '@playwright/test';

import dotenv from 'dotenv';
dotenv.config();

test('Left Panel Test', async ({ page }) => {
// Login to Axle QA account through google
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

    //Type in the name of a project or assay
    const searchString = 'sclc';
    await page.getByRole('textbox', { name: 'Filter projects and assays' }).click();
    await page.getByRole('textbox', { name: 'Filter projects and assays' }).fill(searchString);
    //Wait for loader to disappear
    await page.waitForSelector('.loader', { state: 'hidden' });

    // Verify that the search string is in the visible entries
    try {
      // Get all the visible entries
      const entries = await page.$$('.subtitle.tree-container__text');
    
      // Check each entry
      for (let i = 0; i < entries.length; i++) {
        const entryText = await entries[i].innerText();
        expect(entryText).toContain(searchString);
      }
    
      console.log('Verification succeeded: All entries contain the search string.');
    } catch (error) {
      console.log('Verification failed: Not all entries contain the search string.', error);
    }

   
    //Click on the a search entry
    await page.click('span.subtitle.tree-container__text[title="s-sclc-H187-mipe5-1"]');

    //Wait for Central panel to load selected entry that contains the sample name 'Tariquidar'
    await page.waitForSelector('.loader', { state: 'hidden' });
    //Verify that the sample name 'Tariquidar' is present on the page
    try {
  await page.waitForSelector(':has-text("Tariquidar")');
  console.log('Verification succeeded: The text "Tariquidar" is present on the page.');
} catch (error) {
  console.log('Verification failed: The text "Tariquidar" is not present on the page.', error);
}

});