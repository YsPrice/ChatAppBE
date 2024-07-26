const { Model, DataTypes } = require('sequelize');
const { sequelize, globalOptions } = require('../db/database.js');

class Conversation extends Model {}
Conversation.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    last_message_at: {
        type: DataTypes.DATE
    },
    is_private: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: 'Conversation',
    tableName: 'conversations',
    ...globalOptions.define
});

module.exports = Conversation;
