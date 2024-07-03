// app.js
const express = require('express');

const messageRoutes = require('./routes/messageRoutes.js');
const app = express();
app.use(express.json())


app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api', messageRoutes);
const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app; // Make sure to export app
