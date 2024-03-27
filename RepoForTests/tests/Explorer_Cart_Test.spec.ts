import { test, expect } from '@playwright/test';

import dotenv from 'dotenv';
dotenv.config();

test('Add and Delete From Cart Test', async ({ page }) => {
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

    // Add Single Agent to Cart
    await page.getByRole('button', { name: 'Single Agent' }).click();
    await page.waitForSelector('.loader', { state: 'hidden' });
    await page.getByRole('row', { name: '110980 s-sclc-DMS114-mipe5-1' }).getByRole('checkbox').nth(1).click();
    await page.getByRole('button', { name: 'Cart Icon Cart ' }).click();
    await page.getByRole('button', { name: 'Add to Cart' }).click();
    await page.waitForSelector('.loader', { state: 'hidden' });
    await page.waitForSelector(':has-text("The checked items were")');
    await page.getByLabel('The checked items were').click();
    await page.waitForLoadState('load');
    // Add Matrix to cart
    await page.getByRole('button', { name: 'Matrix' }).click();
    await page.waitForSelector('.loader', { state: 'hidden' });
    await page.getByRole('row', { name: '12831 m-sclc-H446-10x10-p1' }).getByRole('checkbox').nth(1).click();
    await page.getByRole('button', { name: 'Cart Icon Cart ' }).click();
    await page.getByRole('button', { name: 'Add to Cart' }).click();
    // Wait for the element with the class 'loader' to be hidden
    await page.waitForFunction(() => 
        Array.from(document.querySelectorAll('.loader')).every(loader => loader.offsetParent !== null)
    );
    //await page.waitForSelector('.loader', { state: 'hidden' });
    //await page.waitForSelector(':has-text("The checked items were")');
    //await page.getByLabel('The checked items were').click();
    // Wait for a short delay
    //await page.waitForTimeout(1000); // Wait for 1 second
    //Wait for Toast message for adding to cart to be visible

    await page.waitForFunction(() => 
        document.body.innerText.includes("The checked items were")
    );
    await page.waitForSelector(':has-text("The checked items were")', { state: 'visible' });
    
    //await page.getByLabel('The checked items were').click();

    //await page.waitForSelector('.ng-tns-c103-18.toast-message.ng-star-inserted', { state: 'visible' });
    //await page.waitForLoadState('load');
    //View Cart
    await page.getByRole('button', { name: 'Cart Icon Cart ' }).click();
    await page.waitForFunction(() => 
      document.body.innerText.includes("View Cart")
    );
    await page.getByRole('button', { name: 'View Cart' }).click();
    // Wait for the element with the class 'loader' to be hidden
    await page.waitForFunction(() => 
    Array.from(document.querySelectorAll('.loader')).every(loader => loader.offsetParent !== null)
    );
  
    await page.waitForFunction(() => 
      document.body.innerText.includes("Warning!")
    );
 
    // Listen for the 'dialog' event and Click "Continue to Cart"
    page.on('dialog', async dialog => {
      console.log(dialog.message());
      await dialog.accept();
    });
    
    await page.waitForFunction(() => 
    Array.from(document.querySelectorAll('.loader')).every(loader => loader.offsetParent !== null)
    );
    
    // Wait for a short delay
    await page.waitForTimeout(1000); // Wait for 1 second

    // Clear Single Agents from cart
    await page.waitForFunction(() => 
      document.body.innerText.includes("Single Agent")
    );
    await page.waitForSelector('button:has-text("Single Agent")', { state: 'visible' });
    await page.getByRole('button', { name: 'Single Agent' }).click();
    await page.getByRole('button', { name: 'Cart Icon Cart ' }).click();
    await page.getByRole('button', { name: 'Clear Cart' }).click();
    await page.waitForLoadState('load');
    await page.getByText('Single Agent Serial(s)').click();
    //await page.getByRole('button', { name: 'Clear' }).click();
    await page.waitForSelector('.p-button-label:has-text("Clear")');
    await page.click('.p-button-label:has-text("Clear")');
    await page.waitForLoadState('load');
    await page.waitForFunction(() => 
        document.body.innerText.includes("You have deleted")
    );
    //await page.waitForSelector(':has-text("You have deleted all items in")');
    //await page.getByLabel('You have deleted all items in').click();
    // Clear Matrix agents from cart
    await page.getByRole('button', { name: 'Cart Icon Cart ' }).click();
    await page.getByRole('button', { name: 'Clear Cart' }).click();
    await page.getByText('Matrix Serial(s)').click();
    await page.getByRole('button', { name: 'Clear' }).click();
    await page.getByLabel('You have deleted all items in').click();

});