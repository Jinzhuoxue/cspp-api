import { Router }          from 'express'

import login    from './login'
import register from './register'

const api = new Router()

//GET_TOKEN Endpoint
api.post('/login', login)

api.post('/register', register)

export default api
