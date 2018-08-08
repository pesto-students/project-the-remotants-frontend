import { Selectors, Routes } from '../config/testConstants';

const createSelectors = (selector) => {
  return `[data-test=${selector}]`;
};

const Signup = async (page, details) => {
  await page.goto(Routes.authentication);
  await page.waitForSelector(createSelectors(Selectors.loginAndRegisterPage));
  await page.click(createSelectors(Selectors.registerEmailTextBox));
  await page.type(createSelectors(Selectors.registerEmailTextBox), details.email);
  await page.click(createSelectors(Selectors.registerPasswordTextBox));
  await page.type(createSelectors(Selectors.registerPasswordTextBox), details.password);
  await page.click(createSelectors(Selectors.registerButton));
  await page.waitForSelector(createSelectors(Selectors.onRegistering));
};

export { Signup };
