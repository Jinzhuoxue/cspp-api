import { Router }           from 'express'
import all                  from './all'

const api = new Router()

api.get('/', all)

export default api
