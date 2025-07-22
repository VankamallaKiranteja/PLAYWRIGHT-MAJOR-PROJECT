
export class AccountLogin {
   
    constructor(page) {
      this.page = page;
      this.loginLink = page.locator("//a[normalize-space()='Login / Signup']");
      this.usernameInput = page.locator("//input[@id='username']");
      this.passwordInput = page.locator("//input[@id='password']");
      this.loginButton = page.locator("//button[@id='login']");
      this.userName=page.locator("//span[@id='usernameErrorBlock']");
      this.passwordError = page.locator("//span[@id='passwordErrorBlock']");
      this.rememberCheckbox = page.locator("#remember"); 
    }
  
    async gotoLoginPage() {
      await this.page.goto('https://www.practo.com/', { waitUntil: 'domcontentloaded' });
      await this.loginLink.click();
    }
  
    async login(username, password) {
    
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    }

    async getUsernameErrorText() {
        return await this.userName.textContent();
      }
    
      async getPasswordErrorText() {
        return await this.passwordError.textContent();
      }

      async isRememberMeChecked() {
        return await this.rememberCheckbox.isChecked();
      }
    
  }
  