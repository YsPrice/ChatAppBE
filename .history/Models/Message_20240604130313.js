const { Model, DataTypes } = require('sequelize');
const { sequelize, globalOptions } = require('../db/database.js'); // Adjust the path as needed

class Message extends Model {}
Message.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fromUserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    toUserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'message',
    tableName: 'messages',
    ...globalOptions.define
});

module.exports = Message;
