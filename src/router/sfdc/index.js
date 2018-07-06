import { Router }          from 'express'

import loadAccounts          from './loadAccounts'
import setHeader from '../../middleware/setHeader'

const api = new Router()

api.get('/', (req, res) => {
    res.json({
        message : 'You are alive!'
    })
})
//Create User Endpoint
api.get('/accounts', setHeader, loadAccounts)
api.post('/accounts', loadAccounts)

export default api
