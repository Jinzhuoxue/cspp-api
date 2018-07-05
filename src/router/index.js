import { Router }     from 'express'

import wrapResponseBody from '../middleware/wrapResponseBody'
import verifyToken 	from '../middleware/verifyToken'
import setHeader 		from '../middleware/setHeader'
// Router Collections
import user						from './user'
import auth						from './auth'

export default function() {
	var api = Router()

  // perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({
			message : 'Hello Magento!'
		})
	})

	//api.use('/user', setHeader, user, wrapResponseBody)
	api.use('/user', verifyToken, setHeader, user, wrapResponseBody)
	//Skip the token virify
	//api.use('/user', setHeader, user, wrapResponseBody)
	//TODO : add verifyToken milddleware
  api.use('/auth', auth)

	return api
}
