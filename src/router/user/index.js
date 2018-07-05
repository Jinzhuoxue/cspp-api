import { Router }          from 'express'

import parseRequestBody from '../../middleware/parseRequestBody'
import autoPopulateFields from '../../middleware/autoPopulateFields'

import findByEmail         from './findUserByEmail'
import getData        		 from './getData'
import createUser          from './createUser'
import updateUser          from './updateUser'
import upsertUser          from './upsertUser'

const api = new Router()

//GET_FROM_EMAIL Endpoint
api.post('/address/getData.xml', parseRequestBody, getData)

//POST_USER_CREATE Endpoint
api.post('/address/submit.xml', parseRequestBody, autoPopulateFields, upsertUser)
// api.post('/address/submit.xml', (req, res) =>{

// 	console.log('submit.xml invoked.');
// 	console.dir(req.headers);
// 	console.dir(req.params);
// 	console.dir(req.file);
// 	console.dir('submit data req body is: '+req.body);
// 	console.log(req.body.newsletter.email);
// 	console.log(req.body.newsletter.data_source);
// 	console.dir('submit data req query is: '+req.query);

// })


//POST_USER_UPDATE Endpoint
//api.patch('/', updateUser)

export default api
