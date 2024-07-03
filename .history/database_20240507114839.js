const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chat_app_db', 'asura', 'Megaman', {
    host:'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;