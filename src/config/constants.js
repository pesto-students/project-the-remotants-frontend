const URLS = {
  BACKEND_URL: 'http://localhost:8000',
  FRONTEND_URL: 'http://localhost:8080',
};

const env = process.env.NODE_ENV;
if ((env === 'production') || (env === 'staging')) {
  URLS.BACKEND_URL = 'https://the-remotants-backend.herokuapp.com';
  URLS.FRONTEND_URL = 'https://the-remotants.netlify.com';
}

export { URLS };

const LOCAL_STORAGE_KEY = 'the-remotants';

export const LOCAL_STORAGE_AUTH = `${LOCAL_STORAGE_KEY}-auth`;
export const LOCAL_STORAGE_GITHUB = `${LOCAL_STORAGE_KEY}-github`;
export const LOCAL_STORAGE_WAKATIME = `${LOCAL_STORAGE_KEY}-wakatime`;
