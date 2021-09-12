module.exports = async function (Model, payload = {}) {
  await Model.findAll({ payload });
};
