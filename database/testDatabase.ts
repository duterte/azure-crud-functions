import sequelize from './index';

async function testDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (err) {
    console.log('Unable to connect to the database:', err);
  }
}

testDatabase();
