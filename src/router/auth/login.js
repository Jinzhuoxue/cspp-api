import jwt from 'jsonwebtoken'
import createToken from '../../utils/createToken'
import _ from 'underscore'

import {verifyNewsLettter}  from '../../models/NewsLetter'

export default async function(req, res, next) {


  console.dir(req.body);

  let user = req.body;

  if((user.phone || user.email) && user.password) {

      let result = await verifyNewsLettter(user)
      
      if(result == null){
        res.boom.badRequest('User Not Found')
        return;
      }else{
        let token = createToken(result, process.env.JWT_ISSUER || 'csapp')

        if(!token){
            return next();
        }else{
            res.send({ 'access_token':token});
        }
      }
      
  } else {
    res.boom.badRequest('Invalid User');
    return;
  }
}
