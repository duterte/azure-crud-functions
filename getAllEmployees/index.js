const DATABASE = require('../data');

module.exports = async function (context, req) {
  let status = 200;

  context.res = {
    status: status,
    body: DATABASE,
  };
};
