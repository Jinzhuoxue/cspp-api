import { Router }          from 'express'
import multer from 'multer'

import getToken         from './getToken'

let auth  = multer();

const api = new Router()

//GET_TOKEN Endpoint
api.post('/getToken', getToken)

export default api
