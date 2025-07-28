export class HospitalPage {

    constructor(page) {
        this.page = page;
        this.locationlocator = this.page.getByPlaceholder('Search location');
        this.hospitaltype = this.page.getByPlaceholder('Search doctors, clinics, hospitals, etc.');
        this.hospitalselec = this.page.locator('//div[@class="c-omni-suggestion-group"][1]/div[4]');
        this.messageLocator = this.page.locator('.u-bold.u-large-font');
        this.firstHospital = this.page.locator("(//div[@class='c-estb-card'])[1]");
        this.dname = this.page.locator('//h2[@class="doctor-name"]')

    }

    async navigating() {
        try {
            console.log('Navigating to the URL');
            await this.page.goto('https://www.practo.com/', { waitUntil: 'domcontentloaded' });
        } catch (error) {
            console.log('Error during navigation');
        }
    }

    async locatinghospital(city) {
        try {
            await this.locationlocator.fill(city);
        } catch (error) {
            console.log('Error while filling location field:');
        }
    }

    async hospital(type) {
        try {
            await this.hospitaltype.fill(type);
            await this.hospitalselec.waitFor({ state: 'visible' });
            await this.hospitalselec.click();
        } catch (error) {
            console.log('Error during hospital type selection:');
        }
    }


    async qualifiedHospitals() {
        try {
            await this.page.waitForSelector('.left .c-estb-card', { timeout: 10000 });

            const hospitalCards = await this.page.locator('.left .c-estb-card').all();
            const qualifiedHospitals = [];

            for (const card of hospitalCards) {
                try {
                    const name = (await card.locator('.line-1').textContent()).trim();
                    const ratingText = (await card.locator('.c-feedback .u-bold').textContent()).trim();
                    const availabilityText = (await card.locator('.pd-right-2px-text-green').textContent()).trim();
                    const locationText = (await card.locator('.c-locality-info').textContent()).trim();//

                    const ratingValue = parseFloat(ratingText);// Convert rating text to a number

                    if (ratingValue > 3.5 && availabilityText.includes('24x7')) {
                        qualifiedHospitals.push({
                            name,
                            rating: ratingValue,
                            availability: availabilityText,
                            location: locationText,
                        });// Add the hospital to the list if it meets the conditions
                    }
                } catch (error) {
                    console.log('Skipped a hospital due to missing or malformed data');
                }
            }

            //console.log('Qualified Hospitals:', qualifiedHospitals);
            return qualifiedHospitals;

        } catch (error) {
            console.log('Error while fetching hospital cards');
        }
    }

    async printHospitals(List,countofHospitals){
        console.log(`Number Of Hospitals : ${countofHospitals}`);
        console.log(List)
    }
    async enterInvalidSearchAndCaptureMessage(invalidText) {

        await this.hospitaltype.click(); // Click to focus on the input field
        await this.hospitaltype.fill(invalidText);// Fill the input with invalid text

        await this.page.waitForTimeout(10000); // Wait for the input to process

        await this.page.keyboard.press('Enter');

        // Wait for error message to appear

        await this.messageLocator.waitFor(); // Ensure it's visible

        const errMessage = await this.messageLocator.textContent();// Get the error message text

        return errMessage;
    }




}