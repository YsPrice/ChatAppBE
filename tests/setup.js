
const { sequelize } = require('../db/database.js')

beforeAll(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});

afterAll(async () => {
    await sequelize.close();
});
