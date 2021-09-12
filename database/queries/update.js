module.exports = async function (Model, data, option) {
  await Model.update(data, option);
  return data;
};
