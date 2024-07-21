
require('dotenv').config();
const express = require('express');
const messageRoutes = require('./routes/messageRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const conversationRoutes = require('./routes/conversationRoutes.js');

const app = express();
app.use(express.json())
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/users', userRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/conversations',conversationRoutes);
const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app; 
