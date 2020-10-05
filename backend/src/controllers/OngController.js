const connection = require('../database/connection')
const generateUniqueId = require('../utils/generateUniqueId')

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*')
        response.json(ongs)
    },
    async create(request, response) {
        let {name, email, whatsapp, city, uf} = request.body
    
        const id = generateUniqueId()
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
    
        response.json({ id })
    }
}