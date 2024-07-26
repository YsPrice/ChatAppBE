
require('dotenv').config();
const express = require('express');
const messageRoutes = require('./routes/messageRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const conversationRoutes = require('./routes/conversationRoutes.js');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json())
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/users', userRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/conversations',conversationRoutes);

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app; 
