const { init_requestContext } = require('./RequestContext');
const { info, trace, error, warn, debug, init_pinoLogger }=require('./impl/loggerImpl')
const logger_ = (serviceName) => {
  init_requestContext();
  init_pinoLogger(serviceName);
};

module.exports = {logger_,info, trace, error, warn, debug};
