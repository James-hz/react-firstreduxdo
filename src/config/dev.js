import AppConfig from './base';
//var AppConfig = require("config/base")

const config = {
  appEnv: 'dev',
};

export default Object.freeze(Object.assign({}, AppConfig, config));
