const {Model, DataTypes} = require('sequelize');
const sequelize = require('./database.js');

class User extends Model {}
User.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    profileImage:{
        type: DataTypes.STRING,
        allowNull:true
    },
    lastActive:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
},{
    sequelize, 
    modelName: 'user',
    tableName:'users',
    timestamps:true,
    underscored:true,
    paranoid:true
});

module.exports = User;