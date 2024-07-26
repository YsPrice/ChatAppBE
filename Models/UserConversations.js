const { Model, DataTypes } = require('sequelize');
const { sequelize, globalOptions } = require('../db/database.js');

class UserConversations extends Model {}
UserConversations.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id'
        }
    },
    conversation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'conversations', 
            key: 'id'
        }
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'member'
    },
    joined_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'UserConversations',
    tableName: 'user_conversations',
    ...globalOptions.define
});

module.exports = UserConversations;
