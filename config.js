export const path = {
  root: __dirname,
  src: `${__dirname}/src`,
  entry: `${__dirname}/src/index.js`,
  output: `${__dirname}/dist/assets`,
  content_base: `${__dirname}/dist`,
  public: `/assets/`,
  html: '../index.html'
};

export const dev_server = {
  port: 3000,
  host: 'localhost'
};

export const development = {
  title: 'Nebular',
  CONSTANTS: {
    __PRODUCTION__: false,
    __DEVELOPMENT__: true,
    __DEV_TOOLS_ENABLED__: true,
    __API_BASE_URL__: 'https://nebular.me/api/v1'
  }
};

export const production = {
  title: 'Nebular',
  CONSTANTS: {
    __PRODUCTION__: true,
    __DEVELOPMENT__: false,
    __DEV_TOOLS_ENABLED__: false,
    __API_BASE_URL__: 'https://nebular.me/api/v1'
  }
};
