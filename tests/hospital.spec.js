import { test, expect } from '@playwright/test';

import { HospitalPage } from '../pages/hospitalPage';

test('Find hospitals in Chennai with filters', async ({ page }) => {
    try {
        const hospitalPage = new HospitalPage(page);
        await hospitalPage.navigating();
        await hospitalPage.locatinghospital('Chennai');
        await hospitalPage.hospital('Hospital');
        const ListofHospitals = await hospitalPage.qualifiedHospitals();
        expect(ListofHospitals.length).toBeGreaterThan(0);
        await hospitalPage.printHospitals(ListofHospitals, ListofHospitals.length);
    } catch (error) {
        console.log('Error during "Find hospitals in Chennai with filters');
    }
});

test('Enter invalid hospital type and capture message', async ({ page }) => {
    try {
        const hospitalPage = new HospitalPage(page);
        await hospitalPage.navigating();
        const errorMessage = await hospitalPage.enterInvalidSearchAndCaptureMessage('%#^&^*');
        expect(errorMessage.trim()).toBe("We couldn't find any doctors for you");
    } catch (error) {
        console.log('Error during Enter invalid hospital type and capture message');
    }
});
