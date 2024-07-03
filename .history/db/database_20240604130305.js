const { Sequelize } = require('sequelize');
const _ = require('lodash');
const Utils = require('sequelize/lib/utils');

const sequelize = new Sequelize('chat_app_db', 'asura', 'Megaman_1', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(() => {
        console.log('Sequelize instance created:', sequelize);
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

// Export sequelize instance for use in models
module.exports = {
    sequelize,
    globalOptions
};
