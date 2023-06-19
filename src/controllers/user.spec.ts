import request from 'supertest';
import app from '../app';

describe('user controller test without login', () => {
  it('GET /api/user but without login', async () => {
    await request(app)
      .get('/api/user')
      .then(response => {
        expect(response.statusCode).toBe(401);
      });
  });
});

describe('user controller tests', () => {
  let token = '';
  let newUserId = '';
  const newUser = {
    login: 'test user',
    password: 'password123',
    age: 20
  };
  beforeAll(async () => {
    await request(app)
      .post('/login')
      .send({
        username: 'Selena',
        password: 'password123'
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.token).not.toBeNull();
        token = response.body.token;
      });
  });
  it('GET /api/user', async () => {
    await request(app)
      .get('/api/user')
      .set('Authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
      });
  });
  it('POST /api/user', async () => {
    await request(app)
      .post('/api/user')
      .set('Authorization', token)
      .send(newUser)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.successful).toBe(true);
        expect(response.body.result.id).toBeTruthy();
        newUserId = response.body.result.id;
      });
  });
  it('GET /api/user/:id', async () => {
    await request(app)
      .get(`/api/user/${newUserId}`)
      .set('Authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
  it('PUT /api/user', async () => {
    const updatedUserName = 'test user new';
    await request(app)
      .put(`/api/user/${newUserId}`)
      .set('Authorization', token)
      .send({
        login: updatedUserName,
        password: 'password123',
        age: 20
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.successful).toBe(true);
      });
  });
  it('DELETE /api/user', async () => {
    await request(app)
      .delete(`/api/user/${newUserId}`)
      .set('Authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.successful).toBe(true);
      });
  });
});
