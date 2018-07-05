import jwt from 'jsonwebtoken'
import createToken from '../../utils/createToken'
import _ from 'underscore'

import multer from 'multer'
export default async function(req, res, next) {


  console.log('req.body: '+req.body);

  let result = req.body;

  console.log('secret: '+result.JWT_SECRET);

  //console.dir(req.query)
  // const { client_id } = req.query || req.params

  // console.log(client_id)
  // if(!client_id){
  //   res.boom.badRequest('Client Id missing');
  //   return;
  // }else{
  if(result.JWT_SECRET === process.env.JWT_SECRET && result.JWT_ISSUER === process.env.JWT_ISSUER) {
    // const jwt_client_id = process.env.JWT_CLIENT_ID

    // let clientIds = jwt_client_id ? jwt_client_id.split(',') : []

    // if(_.indexOf(clientIds, client_id) === -1){
    //   res.boom.badRequest('Invalid Client Id');
    // }else{
      let token = createToken({'client_id':'client_id'}, process.env.JWT_ISSUER || 'orsay')

      let result = { 'access_token':token}
      if(!token){
        return next();
      }else{
        res.send(result);
      }
    // }
  } else {
    // if(!client_id){
    res.boom.badRequest('Invalid Secret or Issuer');
    return;
  }
}
