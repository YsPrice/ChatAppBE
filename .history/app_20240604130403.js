const express = require('express');
const { sequelize } = require('./db/database.js'); // Adjust the path as needed
require('./db/associations.js'); // Ensure associations are set up

const app = express();

// Other configurations and routes...

sequelize.sync() // Ensure the database is synchronized
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.log('Unable to connect to the database:', err);
    });
