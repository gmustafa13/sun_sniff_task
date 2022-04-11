const superTest = require('supertest')
const { app } = require('../index');
const { dbConnect } = require('../src/utils/db')

// mongodb mock
beforeAll(async () => {
    await dbConnect()
});

// /ping url test
describe('Testing location module', () => {
    test('ping test', async () => {
        const response = await superTest(app).get('/ping')
        expect(response.status).toEqual(200)
        expect(response.body.data).toBe('pong')
    })

    test('get location by name', async() => {
        const response = await superTest(app)
            .get(`${process.env.BASE_URL}/location`)
            .query({ q: "Abbotsford" })
        expect(response.status).toEqual(200)
        expect(response.body.data[0].name).toEqual('Abbotsford')

    })
})