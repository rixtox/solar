export const path = {
  root: __dirname,
  src: `${__dirname}/src`,
  entry: `${__dirname}/src/index.js`,
  output: `${__dirname}/dist/assets`,
  content_base: `${__dirname}/dist`,
  public: `/assets/`,
  html: '../index.html',
  favicon: '../favicon.ico'
};

export const dev_server = {
  port: 3000,
  host: '0.0.0.0'
};

export const prod_server = {
  port: 3000,
  host: '0.0.0.0'
};

export const development = {
  title: 'Nebular',
  CONSTANTS: {
    __DEV_TOOLS__: true,
    __NAMESPACE__: 'nebular.me',
    __API_BASE_URL__: 'https://nebular.me/api/v1/'
  }
};

export const production = {
  title: 'Nebular',
  CONSTANTS: {
    __DEV_TOOLS__: false,
    __NAMESPACE__: 'nebular.me',
    __API_BASE_URL__: 'https://nebular.me/api/v1/'
  }
};
