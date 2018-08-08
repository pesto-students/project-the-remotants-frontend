import { URLS } from './constants';

const Selectors = {
  loginAndRegisterPage: 'registerAndLoginPage',
  registerEmailTextBox: 'registerEmail',
  registerPasswordTextBox: 'registerPassword',
  registerButton: 'signupButton',
  onRegistering: 'onBoarding1',
};

const Routes = {
  authentication: `${URLS.FRONTEND_URL}/auth`,
};

export {
  Selectors,
  Routes,
};
