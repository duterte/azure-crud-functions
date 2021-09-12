const INCREMENT = 'employeeNumber';

module.exports = async function (Model, data, option) {
  if (option && option.increment) {
    const index = await Model.max(INCREMENT);
    if (index) {
      data[INCREMENT] = index + 1;
    } else {
      data[INCREMENT] = 1;
    }
  }
  data = await Model.create(data);
  return data;
};
