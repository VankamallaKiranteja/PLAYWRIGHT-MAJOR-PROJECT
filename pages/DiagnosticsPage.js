export class DiagnosticsPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    try {
      await this.page.goto('https://www.practo.com/tests');
    } catch (error) {
      console.error('Error navigating to diagnostics page:');
    }
  }
  //Promise.all waits for all innerText() calls to complete.
  async getCityList() {
    try {

      const cityNames = [];

      const cities = await this.page.locator("//li[@class='u-text--center']").all();

      for (const city of cities) {
        cityNames.push(await city.innerText());
      }

      return cityNames;
    } catch (error) {
      console.error('Error retrieving city list:');

    }
  }

}

