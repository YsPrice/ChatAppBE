const sequelize = require('./database');

sequelize.getQueryInterface().showAllTables().then(tables => {
    console.log(tables); 
  }).catch(error => {
    console.error('Error fetching tables:', error);
  });