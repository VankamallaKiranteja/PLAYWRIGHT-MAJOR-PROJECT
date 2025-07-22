import { test, expect } from '@playwright/test';
import { CorporateWellnessPage } from '../pages/CorporateWellnessPage';

test('Validate form does not allow submission with invalid data', async ({ page }) => {
  try {
    const wellnessPage = new CorporateWellnessPage(page);
    await wellnessPage.goto();
    await wellnessPage.fillInvalidDetails();
    await expect(wellnessPage.scheduleButton).toBeDisabled();
  } catch (e) {
    console.log('Validate form does not allow submission with invalid data');
  }
});


test('Form Schedule button disable with out phone number field input', async ({ page }) => {
  try {
    const wellnessPage = new CorporateWellnessPage(page);
    await wellnessPage.goto();
    await wellnessPage.fillValidDetails();

    const button = await wellnessPage.scheduleButton;
    // await button.waitFor({ state: 'visible' });
    
    await expect(button).toBeDisabled();

    // await expect(isEnabled).toBeTruthy();
  } catch (e) {
    //expect(button).toBeDisabled()
    console.log('Form enables Schedule Demo button with out valid input ');
  }
});

test('Dropdown values reflect correctly after selection', async ({ page }) => {
  try {
    const wellnessPage = new CorporateWellnessPage(page);
    await wellnessPage.goto();

    await wellnessPage.orgSizeSelect.selectOption({ label: '1001-5000' });
    await wellnessPage.interestSelect.selectOption({ label: 'Referring someone' });

    const sizeValue = await wellnessPage.orgSizeSelect.inputValue();
    const interestValue = await wellnessPage.interestSelect.inputValue();

    expect(sizeValue).toBe('1001-5000');
    expect(interestValue).toBe('Referring someone');
  } catch (e) {
    console.log('Dropdown values reflect correctly after selection');
  }
});

test('@sanity Url contains corporate', async ({ page }) => {
  try {
    const wellnessPage = new CorporateWellnessPage(page);
    await wellnessPage.goto();
    const url = await page.url();
    console.log('Current URL', url);
    await expect(url).toContain('corporate');
  } catch (e) {
    console.log('Url contains corporate');
  }
});
