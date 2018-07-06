import createToken from '../../utils/createToken'
import {createUser}  from '../../models/NewsLetter'

export default async function(req, res, next) {

  console.log('req.body: '+req.body);

  let user = req.body;

  console.dir(user);

  if((user.phone || user.email) && user.password) {

      let result = await createUser(user)
      
      console.dir(result);

      if(result.errorCode){
        res.send(result);
        return
      }

      let token = createToken(result, process.env.JWT_ISSUER || 'csapp');
      if(!token){
        return next();
      }else{
        res.send({ 'access_token':token});
      }
  } else {
    res.boom.badRequest('Invalid User');
    return;
  }
}
