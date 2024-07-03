const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chat_app_db', 'asura', '', {
    host:'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;