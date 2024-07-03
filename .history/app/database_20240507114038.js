const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chat_app_db', 'asura', 'Megaman_1', {
    host:'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;