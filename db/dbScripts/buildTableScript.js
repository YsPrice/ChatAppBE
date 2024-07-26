const {sequelize} = require('../database.js');
const User = require('../../Models/User.js');
const Conversation = require('../../Models/Conversation.js');
const Message = require('../../Models/Message.js');
const UserConversation = require('../../Models/UserConversation.js')

const createTables = async () => {
    await sequelize.sync({force:true})
}
createTables().then(()=>{
    console.log('Tables Successfully Created!');
    process.exit(0)
}).catch((error)=>{
    console.log('error creating tables!', error);
    process.exit(1);
});