import request from 'supertest';
import app from '../app';

describe('group controller tests', () => {
  let token = '';
  let newGroupId = '';
  const newGroup = {
    name: 'new-team-test',
    permissions: ['READ', 'DELETE']
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
  it('GET /api/group', async () => {
    await request(app)
      .get('/api/group')
      .set('Authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
      });
  });
  it('POST /api/group', async () => {
    await request(app)
      .post('/api/group')
      .set('Authorization', token)
      .send(newGroup)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.successful).toBe(true);
        expect(response.body.result.id).toBeTruthy();
        newGroupId = response.body.result.id;
      });
  });
  it('GET /api/group/:id', async () => {
    await request(app)
      .get(`/api/group/${newGroupId}`)
      .set('Authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
  it('PUT /api/group', async () => {
    const updatedGroupName = 'new-team-test-new';
    await request(app)
      .put(`/api/group/${newGroupId}`)
      .set('Authorization', token)
      .send({
        name: updatedGroupName,
        permissions: ['READ', 'DELETE']
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.successful).toBe(true);
      });
  });
  it('DELETE /api/group', async () => {
    await request(app)
      .delete(`/api/group/${newGroupId}`)
      .set('Authorization', token)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.successful).toBe(true);
      });
  });
});
