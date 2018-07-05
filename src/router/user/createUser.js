import _ from 'underscore'

import {createUser}  from '../../models/NewsLetter'
import createAxmi         from '../../utils/createAxmi'
import xmlparse           from '../../xmlparse'
import errors          from '../../errors'

export default async function(axmi, req, res, next) {

  //const axmi = await xmlparse.parseMagentoXml(req.body)
  console.dir(axmi.data)

  let result
  try{
    result = await createUser(axmi.data)

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
