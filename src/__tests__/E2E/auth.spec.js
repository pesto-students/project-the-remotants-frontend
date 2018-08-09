import puppeteer from 'puppeteer';
import { Signup } from '../../helpers/endToendTestHandlers';

jest.setTimeout(30 * 1000);

const randomUser = {
  email: `xyz${Math.random() * 10000}@gmail.com`,
  password: 'secret',
};


describe('authentication tests', async () => {
  let page;
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    page = await browser.newPage();
  });

  describe('Test Sign up', async () => {
    await test('User should be able to sign up', async () => {
      await Signup(page, randomUser);
    });
  });

  afterAll(async () => {
    await page.close();
    await browser.close();
  });
});

