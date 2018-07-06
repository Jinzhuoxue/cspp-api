import jwt from 'jsonwebtoken'
import boom from 'boom'

export default function (req, res, next) {

  // check header or url parameters or post parameters for token
  let token
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, process.env.JWT_SECRET || 'csapppwd', {
      issuer: process.env.JWT_ISSUER || 'csapp'
    },(err, decoded) => {
      if (err) {
        return res.boom.badRequest('Token is not valid')
      } else {
        console.dir(decoded)
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next()
      }
    })

  } else {

    // if there is no token
    // return an 403 error
    return res.boom.forbidden('No token provided.');

  }
}
