import request from 'supertest';

const API = 'http://localhost:3000/api/v1';

describe('App E2E', () => {
  it('GET /health should return 200', async () => {
    const res = await request(API).get('/health');

    expect(res.status).toBe(200);
  });
});