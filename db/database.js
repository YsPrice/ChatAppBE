const { Sequelize } = require('sequelize');
const _ = require('lodash');
const Utils = require('sequelize/lib/utils');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json') [env];
const chalk = require('chalk')
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});

sequelize.authenticate()
    .then(() => {
        console.log(chalk.greenBright('sequelize instance successful!'));
    })
    .catch(err => {
        console.log('Something went wrong', err);
    });

const globalOptions = {
    define: {
        timestamps: true,
        underscored: true,
        paranoid: true
    }
};


module.exports = {
    sequelize,
    globalOptions
};
