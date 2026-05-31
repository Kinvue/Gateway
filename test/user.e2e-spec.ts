import request from 'supertest';
import { randomUUID } from 'crypto';

const API = 'http://localhost:3000/api/v1';

describe('User E2E', () => {
  const authUserId = randomUUID();
  const secondAuthUserId = randomUUID();

  let userId: string;
  let secondUserId: string;
  let friendshipId: string;

  it('POST /users/me should create profile', async () => {
    const res = await request(API)
      .post('/users/me')
      .send({
        authUserId,
        username: `user_${Date.now()}`,
        displayName: 'Test User',
        avatarUrl: '',
        bio: 'test bio',
      });

    expect([200, 201]).toContain(res.status);
    expect(res.body.id).toBeDefined();

    userId = res.body.id;
  });

  it('POST /users/me should fail if profile already exists', async () => {
    const res = await request(API)
      .post('/users/me')
      .send({
        authUserId,
        username: `duplicate_${Date.now()}`,
      });

    expect([400, 409]).toContain(res.status);
  });

  it('GET /users/me should return current profile', async () => {
    const res = await request(API)
      .get('/users/me')
      .query({ authUserId });

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(userId);
  });

  it('PUT /users/me should update profile', async () => {
    const res = await request(API)
      .put('/users/me')
      .send({
        userId,
        displayName: 'Updated User',
        bio: 'updated bio',
      });

    expect(res.status).toBe(200);
    expect(res.body.displayName).toBe('Updated User');
  });

  it('GET /users/{id} should return profile by id', async () => {
    const res = await request(API).get(`/users/${userId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(userId);
  });

  it('GET /users/{id} should fail with invalid uuid', async () => {
    const res = await request(API).get('/users/bad-id');

    expect([400, 500]).toContain(res.status);
  });

  it('GET /users/settings should return settings', async () => {
    const res = await request(API)
      .get('/users/settings')
      .query({ userId });

    expect(res.status).toBe(200);
    expect(res.body.userId).toBe(userId);
  });

  it('PUT /users/settings should update settings', async () => {
    const res = await request(API)
      .put('/users/settings')
      .send({
        userId,
        language: 'en',
        theme: 'DARK',
        notificationsEnabled: true,
      });

    expect(res.status).toBe(200);
    expect(res.body.userId).toBe(userId);
  });

  it('GET /users/search should search users', async () => {
    const res = await request(API)
      .get('/users/search')
      .query({
        username: 'user',
        limit: 10,
        offset: 0,
      });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.users)).toBe(true);
  });

  it('should create second user for friends tests', async () => {
    const res = await request(API)
      .post('/users/me')
      .send({
        authUserId: secondAuthUserId,
        username: `friend_${Date.now()}`,
        displayName: 'Friend User',
      });

    expect([200, 201]).toContain(res.status);
    secondUserId = res.body.id;
  });

  it('POST /users/friends/send should send friend request', async () => {
    const res = await request(API)
      .post('/users/friends/send')
      .send({
        requesterId: userId,
        receiverId: secondUserId,
      });

    expect([200, 201]).toContain(res.status);
    expect(res.body.id).toBeDefined();

    friendshipId = res.body.id;
  });

  it('POST /users/friends/send should fail if requester equals receiver', async () => {
    const res = await request(API)
      .post('/users/friends/send')
      .send({
        requesterId: userId,
        receiverId: userId,
      });

    expect([400, 500]).toContain(res.status);
  });

  it('POST /users/friends/respond should accept friend request', async () => {
    const res = await request(API)
      .post('/users/friends/respond')
      .send({
        friendshipId,
        status: 'ACCEPTED',
      });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ACCEPTED');
  });

  it('POST /users/friends/respond should fail with invalid status', async () => {
    const res = await request(API)
      .post('/users/friends/respond')
      .send({
        friendshipId,
        status: 'WRONG',
      });

    expect([400, 500]).toContain(res.status);
  });

  it('GET /users/friends should return friends list', async () => {
    const res = await request(API)
      .get('/users/friends')
      .query({
        userId,
        status: 'ACCEPTED',
        limit: 10,
        offset: 0,
      });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.friends)).toBe(true);
  });

  it('GET /users/friends should fail with invalid status', async () => {
    const res = await request(API)
      .get('/users/friends')
      .query({
        userId,
        status: 'ACCEPTE',
        limit: 1,
        offset: 0,
      });

    expect([400, 500]).toContain(res.status);
  });
});