const { pino } = require('pino');
const getMetadata = require('./LogUtils');
const ecsFormat = require('@elastic/ecs-pino-format');
const requestContext = require('../RequestContext');

let serviceName;
let logger;

const init_pinoLogger = (serviceName_) => {
  serviceName = serviceName_;

  logger = pino(ecsFormat());
};

const info = (...statements) => {
  for (const statement of statements) {
    logger
      .child({
        ...getMetadata(serviceName, requestContext.getRequest()),
      })
      .info(statement);
  }
};

const debug = (...statements) => {
  for (const statement of statements) {
    logger
      .child({
        ...getMetadata(serviceName, requestContext.getRequest()),
      })
      .debug(statement);
  }
};

const error = (...statements) => {
  for (const statement of statements) {
    logger
      .child({
        ...getMetadata(serviceName, requestContext.getRequest()),
      })
      .error(statement);
  }
};

const warn = (...statements) => {
  for (const statement of statements) {
    logger
      .child({
        ...getMetadata(serviceName, requestContext.getRequest()),
      })
      .warn(statement);
  }
};

const trace = (...statements) => {
  for (const statement of statements) {
    logger
      .child({
        ...getMetadata(serviceName, requestContext.getRequest()),
      })
      .trace(statement);
  }
};

module.exports = { info, trace, error, warn, debug, init_pinoLogger };
