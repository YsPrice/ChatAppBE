const { Model, DataTypes } = require('sequelize');
const { sequelize, globalOptions } = require('../db/database.js');

class User extends Model {}
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profileImage:{
        type: DataTypes.STRING,
        allowNull:true
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    ...globalOptions.define
});

module.exports = User;
