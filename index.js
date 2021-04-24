const sls = require('serverless-http');
const binaryMimeTypes = require('./binaryMimeTypes');
const nuxt = require('./nuxt');

const handler = sls(nuxt, {
  binary: binaryMimeTypes,
});

module.exports.nuxt = async (event, context) => {
  // you can do other things here
  const result = await handler(event, context);
  // and here
  return result;
};
