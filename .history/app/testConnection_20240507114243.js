const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chat_app_db', 'asura', 'Megaman_1', {
    host:'localhost',
    dialect: 'postgres'
});
sequelize.authenticate()

.then(()=>{
    console.log(
        'you done connected now boah'
    )
})
module.exports = sequelize;