const { Model, DataTypes } = require('sequelize');
const {sequelize, globalOptions} = require('../db/database.js');

class Conversation extends Model {}
Conversation.init({
title:DataTypes.STRING,
},{sequelize,
    ...globalOptions.define,
    modelName:'Conversation',
    tableName:'conversations'



});

module.exports = Conversation;

