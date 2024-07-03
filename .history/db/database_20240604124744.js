const { Sequelize } = require('sequelize');
const Message = require('../Models/Message.js');
const User = require('../Models/User.js');
const sequelize = new Sequelize('chat_app_db', 'asura', 'Megaman_1', {
    host:'localhost',
    dialect: 'postgres'
});

sequelize.authenticate()

.then(()=>{
    console.log(
        'Connection to Database Successful!');

}).catch(err=>{
    console.log('Something went wrong', err)
});

Message.belongsTo(User, { as: 'sender', foreignKey: 'fromUserId' });
Message.belongsTo(User, { as: 'receiver', foreignKey: 'toUserId' });
User.hasMany(Message, {as: 'sentMessages', foreignKey: 'fromUserId'});
User.hasMany(Message, {as: 'receivedMessages', foreignKey:'toUserId'});
User.belongsToMany(Conversation, { through: UserConversations });
Conversation.belongsToMany(User, { through: UserConversations });
module.exports = sequelize;