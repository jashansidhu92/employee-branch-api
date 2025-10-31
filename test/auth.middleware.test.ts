import request from 'supertest';
import { createApp } from '../src/app';


const app = createApp();


describe('Auth middleware', () => {
it('rejects missing token', async () => {
const res = await request(app).get('/api/v1/loans');
expect(res.status).toBe(401);
expect(res.body.error.code).toBe('UNAUTHORIZED');
});


it('rejects invalid token', async () => {
const res = await request(app)
.get('/api/v1/loans')
.set('Authorization', 'Bearer nope');
expect(res.status).toBe(401);
});
});