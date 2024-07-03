const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database.js');
const User = require('./User.js');

class Message extends Model {}
Message.init({
id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
},
content: {
    type: DataTypes.STRING,
    allowNull: false
    },

fromUserId: {
    type: DataTypes.INTEGER,
    allowNull:false,
    references: {
        model: 'users',
        key:'id'
                }
            },

toUserId: {
    type: DataTypes.INTEGER,
    allowNull:false,
    references: {
        model: 'users',
        key:'id'
                }
            }
    },
    {
    sequelize,
    modeName:'message',
    tableName: 'messages',
    timestamps:true,
    underscored:true,
    paranoid:true
});

module.exports = Message;