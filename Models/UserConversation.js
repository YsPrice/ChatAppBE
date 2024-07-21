
const { Model, DataTypes } = require('sequelize');
const {sequelize, globalOptions} = require('../db/database.js');

class UserConversations extends Model {} 
UserConversations.init({
 userId:{
    type: DataTypes.INTEGER,
    allowNull:false,
    references:{
        model:'users',
        key:'id'
    }
 },
 conversationId:{
    type: DataTypes.INTEGER,
    allowNull:false,
    references:{
        model:'conversations',
        key:'id'
    }
 },
 role:{
    type: DataTypes.STRING,
    defaultValue:'member'
 },
 joinedAt: {
    type: DataTypes.DATE,
    defaultValue:DataTypes.NOW
 }

}, 

{
    sequelize,
    ...globalOptions.define,
    modelName: 'UserConversations'
});