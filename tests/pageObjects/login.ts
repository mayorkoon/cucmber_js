import {WebDriver, ByHash} from 'selenium-webdriver';
import {SeleniumWebdriverWrapper} from '../support/seleniumWebdriverWrapper';

export class LoginPageObject extends SeleniumWebdriverWrapper {
  // tslint:disable-next-line:quotemark
  usernameBox: ByHash = {xpath: "//input[@id='accountLoginFormUsername']"};
  // tslint:disable-next-line:quotemark
  passwordBox: ByHash = {xpath: "//input[@id='accountLoginFormPassword']"};
  // tslint:disable-next-line:quotemark
  loginButton: ByHash = {xpath: "//button[contains(text(),'Login')]"};
  // tslint:disable-next-line:quotemark
  signinButton: ByHash = {xpath: "//button[@id='accountLoginFormButton']"};
  // tslint:disable-next-line:quotemark
  loginResults: ByHash = {xpath: "//span[contains(text(),'Frequent Payments')]"};

  acceptCookie: ByHash = {xpath: '//*[@id="overlay"]/div/div/button'};


  constructor(driver: WebDriver) {
    super(driver);
  }

  clickCookie = async () => {
    await this.click(this.acceptCookie);
  }
  clickLogin = async () => {
    await this.click(this.loginButton);
  }

  inputUserEmail = async () => {
    await this.clearFormField(this.usernameBox);
    await this.setValue(this.usernameBox, 'dadubiaro@interswitch.com');
    // await this.click(this.clickNextButton);
  }

  inputPasswordAndLogin = async () => {
    await this.clearFormField(this.passwordBox);
    await this.setValue(this.passwordBox, 'password');
    // await this.click(this.signinButton);
  }

  signIn = async () => {
    await this.click(this.signinButton);
  }
}
