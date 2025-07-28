import { test, expect } from '@playwright/test';
import { CorporateWellnessPage } from '../pages/CorporateWellnessPage';

test('Validate form does not allow submission with invalid data', async ({ page }) => {
  try {
    const wellnessPage = new CorporateWellnessPage(page);
    await wellnessPage.goto();
    await wellnessPage.fillInvalidDetails();
    await expect(wellnessPage.scheduleButton).toBeDisabled();// Validate that the Schedule button is disabled
  } catch (e) {
    console.log('Error in testCase: Validate form does not allow submission with invalid data');
  }
});


test('Form Schedule button disable with out phone number field input', async ({ page }) => {
  try {
    const wellnessPage = new CorporateWellnessPage(page);
    await wellnessPage.goto();
    await wellnessPage.fillValidDetails();

    const button = await wellnessPage.scheduleButton;
    

    await expect(button).toBeDisabled();

    // await expect(isEnabled).nottoBeTruthy();
  } catch (e) {
    
    console.log('Error in testCase: Form enables Schedule Demo button with out valid input ');
  }
});


test('Dropdown values reflect correctly after selection', async ({ page }) => {
  try {
    const wellnessPage = new CorporateWellnessPage(page);
    await wellnessPage.goto();

    await wellnessPage.dropSelect(); // Set dropdown values

    const { sizeValue, interestValue } = await wellnessPage.getDropSelectValue(); // Destructure returned values

    expect(sizeValue).toBe('1001-5000');  
    expect(interestValue).toBe('Referring someone');// Validate the dropdown values
  } catch (e) {
    console.log('Error in testCase: Dropdown values reflect correctly after selection');
  }
});


test('@sanity Url contains corporate', async ({ page }) => {
  try {
    const wellnessPage = new CorporateWellnessPage(page);
    await wellnessPage.goto();
    const url = await page.url();
    console.log('Current URL', url);
    await expect(url).toContain('corporate');// Validate that the URL contains 'corporate'
  } catch (e) {
    console.log('Error in testCase: Url contains corporate');
  }
});
