const { Sequelize } = require('sequelize');
const _ = require('lodash');
const Utils = require('sequelize/lib/utils'); 
const Message = require('../Models/Message.js');
const User = require('../Models/User.js');
const options = Utils.merge(_.cloneDeep(globalOptions.define), options);
const sequelize = new Sequelize('chat_app_db', 'asura', 'Megaman_1', {
    host:'localhost',
    dialect: 'postgres'
});

sequelize.authenticate()

.then(()=>{
    console.log('Sequelize instance created:', sequelize);
        

}).catch(err=>{
    console.log('Something went wrong', err)
});

const globalOptions = {
    define: {
      timestamps: true,
      underscored: true,
      paranoid: true
    }
  };
  
  // Merging options

  
Message.belongsTo(User, { as: 'sender', foreignKey: 'fromUserId' });
Message.belongsTo(User, { as: 'receiver', foreignKey: 'toUserId' });
User.hasMany(Message, {as: 'sentMessages', foreignKey: 'fromUserId'});
User.hasMany(Message, {as: 'receivedMessages', foreignKey:'toUserId'});
User.belongsToMany(Conversation, { through: UserConversations });
Conversation.belongsToMany(User, { through: UserConversations });

module.exports = sequelize;