const request = require('supertest');
const app = require('../app');

describe('POST /api/messages', () => {
    it('should create a new message', async () => {
        const res = await request(app)
            .post('/api/messages')
            .send({ fromUserId: 1, toUserId: 3, content: 'Heyo from user1 to user2' });
        expect(res.statusCode).toBe(201);
        expect(res.body.data.message.content).toBe('Heyo from user1 to user2');
    });
});