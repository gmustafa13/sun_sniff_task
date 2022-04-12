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

    test('get location by lat and long along with 50 km nearby ',async()=>{
        const response = await superTest(app)
        .get(`${process.env.BASE_URL}/location`)
        .query({ latitude:49.05798,longitude: -122.25257,radius:50 })
    expect(response.status).toEqual(200)
    expect(response.body.data.length).toEqual(17)
    })

    test('get location by wrong name', async() => {
        const response = await superTest(app)
            .get(`${process.env.BASE_URL}/location`)
            .query({ q: "gulam_mustafa_mansuri",latitude:49.05798,longitude: -122.25257 })
        expect(response.status).toEqual(200)
        expect(response.body.data.length).toEqual(0)

    })

    test('get location by partial name', async() => {
        const response = await superTest(app)
            .get(`${process.env.BASE_URL}/location`)
            .query({ q: "lon" })
        expect(response.status).toEqual(200)
        expect(response.body.data.length).toBeGreaterThan(0)

    })
})