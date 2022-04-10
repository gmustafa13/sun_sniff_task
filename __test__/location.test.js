const superTest = require('supertest')
const { app } = require('../index');
const { dbConnect } = require('../src/utils/db')

// mongodb mock
beforeAll(async () => {
    await dbConnect()
});

// /ping url test
describe('first test', () => {
    test('ping test', async () => {
        const response = await superTest(app).get('/ping')
        expect(response.status).toEqual(200)
        expect(response.body.data).toBe('pong')
    })
})