const asyncHooks = require('async_hooks');
const fs = require('fs');
const { fd } = process.stdout;

let store;
let hook;

const init_requestContext = () => {
  store = new Map();
  hook = asyncHooks.createHook({
    init(asyncId, type, triggerAsyncId, resource) {
      init_asyncHook(asyncId, type, triggerAsyncId);
    },
    destroy(asyncId) {
      destroy(asyncId);
    },
  });
  hook.enable();
};

const saveRequest = (request) => {
  // console.log("save request",request);
  // console.log("save asyncHooks.executionAsyncId() : ",asyncHooks.executionAsyncId());
  store.set(asyncHooks.executionAsyncId(), request);
  return request;
};

const getRequest = () => {
  // console.log("get request");
  // console.log("get asyncHooks.executionAsyncId() : ",asyncHooks.executionAsyncId());
  return store.get(asyncHooks.executionAsyncId());
};

const init_asyncHook = (asyncId, _, triggerAsyncId) => {
  // print('init  : ' + asyncId + '   ' + triggerAsyncId + '\n');
  if (store.has(triggerAsyncId)) {
    store.set(asyncId, store.get(triggerAsyncId));
  }
};

const destroy = (asyncId) => {
  // print('destroying: ' + asyncId + '\n');
  if (store.has(asyncId)) {
    store.delete(asyncId);
  }
};
const print = (x) => {
  fs.writeSync(fd, x);
};

module.exports = { init_requestContext, saveRequest, getRequest };
