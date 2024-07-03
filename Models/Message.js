const { Model, DataTypes } = require('sequelize');
const { sequelize, globalOptions } = require('../db/database.js'); 

class Message extends Model {}
Message.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [1,500]
        }
    },
    fromUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' } 
    },
    toUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' } 
    },
    conversationId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{model:'conversations', key:'id'}

    }
}, {
    sequelize,
    indexes: [
{
    fields:['from_user_id'],

},
{
fields:['to_user_id']
},
{
    fields:['conversation_id']
    }
    ],
    modelName: 'Message',
    tableName: 'messages',
    ...globalOptions.define
});

module.exports = Message;
