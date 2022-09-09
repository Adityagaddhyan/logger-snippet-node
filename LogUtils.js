const tracer = require('cls-rtracer');

const getMetadata = (service, request) => {
  return {
    service,
    requestId: tracer.id() || request?.headers?.['x-request-id'],
    userId: request?.headers?.['x-tera-id']||'UNKNOWN',
    ...getCaller(),
    url: request?.url,
  };
};
const getCaller = () => {
  const e = new Error();
  const frame = e.stack.split('\n')[4];
  const caller = frame.trim().substr(3);
  return { caller };
};
module.exports = getMetadata;
