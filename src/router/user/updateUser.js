import _ from 'underscore'

import {updateUser}  from '../../models/NewsLetter'
import createAxmi         from '../../utils/createAxmi'
import xmlparse           from '../../xmlparse'
import errors          from '../../errors'

export default async function(axmi, req, res, next) {

  //const reqJson = await xmlparse.parseMagentoXml(req.body)

  let result
  try{
    result = await updateUser(axmi)

    if(!result){
      return next()
    }else if(result.code){
      return next({message : result.detail})
    }else{
      return next(createAxmi(result))
    }
  }catch(err){
    let result = _.extend(errors.internalServerError, {message : err})
    return next(createAxmi(result))
  }

}
