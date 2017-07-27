import { Router }     from 'express'
import verifyToken    from '../utils/verifyToken'

// Collections
import activitydata          from './activitydata'

export default function() {
	var api = Router()

  // perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({
			message : 'Hello DeFacto!'
		})
	})

  //api.use('/activitydata', activitydata)
	//TODO : add verifyToken milddleware
  api.use('/activitydata', verifyToken, activitydata)

	return api
}
