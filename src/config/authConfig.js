import { URLS } from './constants';


const GITHUB_BACKEND_AUTH_URL = `${URLS.BACKEND_URL}/dashboard/setup-2/github/authenticate`;
const WAKATIME_BACKEND_AUTH_URL = `${URLS.BACKEND_URL}/dashboard/setup-2/wakatime/authenticate`;

const GITHUB_REDIRECT_URI = `${URLS.FRONTEND_URL}/setup-2?auth=github`;
const WAKATIME_REDIRECT_URI = `${URLS.FRONTEND_URL}/setup-2?auth=wakatime`;

/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_OAUTH_SCOPE = process.env.GITHUB_OAUTH_SCOPE;
const GITHUB_OAUTH_RESPONSE_TYPE = process.env.GITHUB_OAUTH_RESPONSE_TYPE;
const WAKATIME_CLIENT_ID = process.env.WAKATIME_CLIENT_ID;
const WAKATIME_OAUTH_SCOPE = process.env.WAKATIME_OAUTH_SCOPE;
const WAKATIME_OAUTH_RESPONSE_TYPE = process.env.WAKATIME_OAUTH_RESPONSE_TYPE;

const GITHUB_OAUTH_BASE_URI = 'https://github.com/login/oauth/authorize';
const GITHUB_OAUTH_URI = `${GITHUB_OAUTH_BASE_URI}?client_id=${GITHUB_CLIENT_ID}&type=${GITHUB_OAUTH_RESPONSE_TYPE}&scope=${GITHUB_OAUTH_SCOPE}&redirect_uri=${GITHUB_REDIRECT_URI}`;

const WAKATIME_OAUTH_BASE_URI = 'https://wakatime.com/oauth/authorize';
const WAKATIME_OAUTH_URI = `${WAKATIME_OAUTH_BASE_URI}?client_id=${WAKATIME_CLIENT_ID}&response_type=${WAKATIME_OAUTH_RESPONSE_TYPE}&scope=${WAKATIME_OAUTH_SCOPE}&redirect_uri=${WAKATIME_REDIRECT_URI}`;

const config = {
  GITHUB_CLIENT_ID,
  GITHUB_REDIRECT_URI,
  GITHUB_BACKEND_AUTH_URL,
  GITHUB_OAUTH_URI,
  WAKATIME_CLIENT_ID,
  WAKATIME_REDIRECT_URI,
  WAKATIME_BACKEND_AUTH_URL,
  WAKATIME_OAUTH_URI,
};

export default config;

