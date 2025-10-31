import request from 'supertest';
import { createApp } from '../src/app';

const app = createApp();

const authed = (token: string) => ({
  get: (url: string) => request(app).get(url).set('Authorization', `Bearer ${token}`),
  post: (url: string) => request(app).post(url).set('Authorization', `Bearer ${token}`),
  patch: (url: string) => request(app).patch(url).set('Authorization', `Bearer ${token}`),
  put: (url: string) => request(app).put(url).set('Authorization', `Bearer ${token}`),
  delete: (url: string) => request(app).delete(url).set('Authorization', `Bearer ${token}`),
});

const asUser = () => authed('demo-user');
const asAdmin = () => authed('demo-admin');

describe('Loans routes', () => {
  it('lists loans (auth required)', async () => {
    const res = await asUser().get('/api/v1/loans');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('creates loan as user', async () => {
    const res = await asUser()
      .post('/api/v1/loans')
      .send({ applicantName: 'Alice', amount: 10000, purpose: 'Car' });
    expect(res.status).toBe(201);
    expect(res.body.data.status).toBe('PENDING');
  });

  it('approves loan as admin', async () => {
    const created = await asUser()
      .post('/api/v1/loans')
      .send({ applicantName: 'Bob', amount: 20000, purpose: 'Business' });

    const id = created.body.data.id as string;

    const approved = await asAdmin().post(`/api/v1/loans/${id}/approve`);
    expect(approved.status).toBe(200);
    expect(approved.body.data.status).toBe('APPROVED');
  });
});
