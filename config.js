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

const title = 'Nebular';
const __NAMESPACE__ = 'nebular.me';
const __API_BASE_URL__ = 'https://nebular.me/api/v1/';
const __THEME_COLORS__ = [
  '#AE433F', '#D4843C', '#F6BF6D', '#91A852', '#73B4AA', '#679FB7', '#AA76A0', '#905532',
  '#FB3071', '#FF9700', '#F6BF6D', '#A8E000', '#9FEEE4', '#5FD9F1', '#AB84FF', '#CE6729',
  '#F47978', '#FC924E', '#FFCB5A', '#99CB96', '#61CBCD', '#619ACF', '#CC9ACE', '#D47C4D',
  '#FE170E', '#FF6F02', '#FFA30F', '#A2C54E', '#74C6B7', '#6BB3D4', '#D383C5', '#C06535',
  '#FDA0B1', '#EFA983', '#DFB268', '#ADC15F', '#00CEC0', '#69C2F2', '#E1A5F1', '#E0AF8C',
  '#C16269', '#D2876D', '#EDCB85', '#A3BD89', '#95B5B4', '#8EA1B4', '#B48FAE', '#AC7965',
  '#151515', '#202020', '#303030', '#505050', '#B0B0B0', '#D0D0D0', '#E0E0E0', '#F5F5F5',
  '#2A303B', '#333D46', '#4E5B67', '#64737F', '#A6ADBB', '#C0C5CF', '#DFE1E8', '#EFF1F5'
];

export const development = {
  title,
  CONSTANTS: {
    __NAMESPACE__,
    __API_BASE_URL__,
    __THEME_COLORS__,
    __DEV_TOOLS__: true
  }
};

export const production = {
  title,
  CONSTANTS: {
    __NAMESPACE__,
    __API_BASE_URL__,
    __THEME_COLORS__,
    __DEV_TOOLS__: false
  }
};
