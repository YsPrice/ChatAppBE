const { sequelize } = require('../database.js');
const { User, Conversation, UserConversations, Message } = require('../associations');
const chalk = require('chalk');

async function syncModels() {
    try {
        await sequelize.sync({ force: true });
        console.log(chalk.greenBright('All models were synchronized successfully.'));
    } catch (error) {
        console.log(chalk.red('Error synchronizing models:', error));
    }
}

syncModels();
