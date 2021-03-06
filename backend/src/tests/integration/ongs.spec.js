const request = require('supertest')
const app = require('../../app')
const connection = require('../../database/connection')

describe('ONG', () => {

    beforeEach(async() => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(() => {
        connection.destroy()
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            "name": "APAD",
            "email": "juankindle@hotmail.com",
            "city": "",
            "whatsapp": "99988187328",
            "uf": "MA"
        })
        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})