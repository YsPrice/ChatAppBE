const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chat_app_db', 'asura', 'M', {
    host:'localhost',
    dialect: 'postgres'
});
sequelize.authenticate()

.then(()=>{
    console.log(
        'you done connected now boah');

}).catch(err=>{
    console.log('you did it nowz boah', err)
})
module.exports = sequelize;