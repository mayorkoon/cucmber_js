import {When, Before, Then, World} from 'cucumber';
import {SeleniumWebdriverWrapper} from '../support/seleniumWebdriverWrapper';
import {stepTimeOut, elementWaitTimeOutValue} from '../support/timeouts';
import {targetUrl} from '../support/env';
import {browserName} from '../support/hooks';
import {supportedBrowserNames} from '../support/supportedBrowserNames';
import {Constants} from '../support/constants';
import {LoginPageObject} from '../pageObjects/login';
import {assert} from 'chai';

let driver: any;
let driverWrapper: SeleniumWebdriverWrapper;
let loginPage: LoginPageObject;

Before({timeout: stepTimeOut}, async function(this: World) {
  driver = this.driver;
  driverWrapper = new SeleniumWebdriverWrapper(driver);
  loginPage = new LoginPageObject(driver);

  if (browserName !== supportedBrowserNames.safari) {
    await driverWrapper.setScreenSize(Constants.adjustScreenWidth, Constants.adjustScreenHeight);
  } else {
    await driverWrapper.maximizeWindow();
  }

  await driverWrapper.getUrl(targetUrl);
});

When(/^I enter my username and password$/, async () => {
  await loginPage.clickCookie();
  await loginPage.clickLogin();
  await loginPage.inputUserEmail();
  // await driverWrapper.waitUntilElementLoadedAndDisplayed(loginPage.passwordBox);
  await loginPage.inputPasswordAndLogin();
  // await driverWrapper.waitUntilElementLoadedAndDisplayed(loginPage.loginResults);
  await loginPage.signIn();
  // tslint:disable-next-line:no-console
  console.log('code got here');

  // tslint:disable-next-line:no-console
  console.log('code passed here');

});

Then(/^I should be logged in successffully$/, async () => {
  await driverWrapper.waitUntilElementLoadedAndDisplayed(loginPage.loginResults);
  const elem = await driverWrapper.findElement(loginPage.loginResults);
  assert.isTrue(await elem.isDisplayed());
});
