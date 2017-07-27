import jwt from 'jsonwebtoken'
import boom from 'boom'

export default function (req, res, next) {

  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token ||
    req.headers['x-access-token']

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, process.env.JWT_SECRET, {
      issuer: process.env.JWT_ISSUER
    },(err, decoded) => {
      if (err) {
        return res.boom.badRequest('Token is not valid')
      } else {
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
