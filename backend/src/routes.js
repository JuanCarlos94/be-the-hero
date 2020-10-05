const express = require('express')
const { celebrate, Joi, Segments} =  require('celebrate')

const routes = express.Router()

const OngController = require('./controllers/OngController')

const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

routes.get('/ongs', OngController.index)
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().length(2)
    })
}), OngController.create)

routes.get('/profiles', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.index)
routes.post('/sessions', SessionController.create)

routes.post('/incidents',IncidentController.create)
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().required()
    })
}), IncidentController.index)

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys(
        {
            id: Joi.number().required()
        }
    )
}), IncidentController.delete)

module.exports = routes