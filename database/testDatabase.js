const sequelize = require('./index');

async function testDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (err) {
    console.log('Unable to connect to the database:', err);
  }
}

testDatabase();
