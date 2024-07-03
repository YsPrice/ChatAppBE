const { Sequelize } = require('sequelize');

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

module.exports = sequelize;