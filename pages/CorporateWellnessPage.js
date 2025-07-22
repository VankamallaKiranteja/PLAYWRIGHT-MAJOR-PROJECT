export class CorporateWellnessPage {
  constructor(page) {
    this.page = page;

    // XPath selectors targeting the first form instance on the page
    this.nameInput = page.locator('//*[@id="name"]').first();
    this.orgInput = page.locator('//*[@id="organizationName"]').first();
    this.phoneInput = page.locator('//*[@id="contactNumber"]').first();
    this.emailInput = page.locator('//*[@id="officialEmailId"]').first();
    this.orgSizeSelect = page.locator('//*[@id="organizationSize"]').first();
    this.interestSelect = page.locator('//*[@id="interestedIn"]').first();
    this.scheduleButton=page.locator("//header[@id='header']//button[@type='submit'][normalize-space()='Schedule a demo']")
    //this.scheduleButton = page.getByRole('button', { name: 'Schedule a demo' });
    // this.baseUrl = 'https://www.practo.com/plus/corporate'; // replace with actual URL
  }

  async goto() {
    try {
      await this.page.goto('https://www.practo.com/plus/corporate', {waitUntil: 'domcontentloaded'});
      
    } catch (error) {
      console.error('Error navigating to the page:');
    }
  }

  async fillInvalidDetails() {
    try {
      await this.nameInput.fill('');
      await this.orgInput.fill('FakeOrg');
      await this.phoneInput.fill('123');
      await this.emailInput.fill('invalid@');
      // await this.orgSizeSelect.selectOption({ label: '<500' });
      // await this.waitfor(1000); // wait for dropdown to update
      // await this.interestSelect.selectOption({ label: 'Taking a demo' });
      // await this.waitfor(1000); // wait for dropdown to update
    } catch (error) {
      console.error('Error filling invalid details:');
    }
  }

  async submitForm() {
    try {
      await this.scheduleButton.click();
    } catch (error) {
      console.error('Error submitting the form:');
    }
  }

  async fillValidDetails() {
    try {
      await this.nameInput.type('Kiran');
      await this.orgInput.type('KiranCorp Pvt Ltd');
      // await this.phoneInput.type('9876543210');
      await this.emailInput.fill('Kiran@techcorp.com');
      // await this.waitforSelector(this.orgSizeSelect); // wait for dropdown to update
      await this.orgSizeSelect.click();

      await this.orgSizeSelect.selectOption({ label: '1001-5000' });
      await this.interestSelect.selectOption({ label: 'Taking a demo' });
      // await this.page.pause();
    } catch (error) {
      console.error('Error filling valid details:');
    }
  }
   
  }
