import jwt from 'jsonwebtoken'
import boom from 'boom'
import createToken from '../utils/createToken'
import _ from 'underscore'

export default function (req, res, next) {

  // check header or url parameters or post parameters for token
  console.dir(req.headers)
  let token
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }

  // decode token
  if (token) {
    console.log('inside if.');
    // verifies secret and checks exp
    jwt.verify(token, process.env.JWT_SECRET || 'something', {
      issuer: process.env.JWT_ISSUER || 'ORSAY'
    },(err, decoded) => {
      if (err) {
        return res.boom.forbidden('Invalid Token')
      } else {
        // if everything is good, save to request for use in other routes
        console.log(decoded)
        const jwt_client_id = process.env.JWT_CLIENT_ID

        let clientIds = jwt_client_id ? jwt_client_id.split(',') : []

        const { client_id } = decoded
        // if(_.indexOf(clientIds, client_id) != -1){
          next()
        // }else{
        //   return res.boom.forbidden('Invalid Token')
        // }
      }
    })

  } else {

    // if there is no token
    // return an 403 error
    return res.boom.forbidden('No token provided.');

  }
}
