import { Router }     from 'express'

import verifyToken 	from '../middleware/verifyToken'
import setHeader 		from '../middleware/setHeader'
// Router Collections
import sfdc						from './sfdc'
import auth						from './auth'

export default function() {
	var api = Router()

  // perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({
			message : 'Hello Magento!'
		})
	})

	//api.use('/user', verifyToken, setHeader, user)
	//Skip the token virify
	api.use('/sfdc', sfdc)
	//TODO : add verifyToken milddleware
  api.use('/auth', auth)

	return api
}
