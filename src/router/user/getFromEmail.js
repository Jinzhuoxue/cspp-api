import _ from 'underscore'

import {findNewsLettter}  from '../../models/NewsLetter'
import createAxmi         from '../../utils/createAxmi'
import errors          from '../../errors'
//import xmlparse           from '../../xmlparse'
import {mapMagentoToSFDC, mapSFDCToClient} from '../../schema/newsletter'

export default async function(axmi, req, res, next) {

  //const reqJson = await xmlparse.parseMagentoXml(req.body)

  console.dir(axmi);

  if(axmi.errorCode){
    return next(createAxmi(axmi))
  }

  const email = _.first(_.filter(axmi.options.fields, item => item.name === 'email'))
  const keys  = _.map(axmi.header.show, key => mapMagentoToSFDC[key] ? mapMagentoToSFDC[key]:key)

  //console.dir(email)

  let result
  try{
    result = await findNewsLettter(email.value, keys, email.op)
    if(!result){

      return next(createAxmi(errors.notFound))
      //return next()
    }

    let newKeys = _.keys(result)
                   .map(key => mapSFDCToClient[key] ? mapSFDCToClient[key] : key)

    let values  = _.values(result)

    result = _.object(newKeys, values)

    if(result.code){
      return next({message : result.detail})
    }else{
      next(createAxmi(result))
    }
  }catch(err){
    let result = _.extend(errors.internalServerError, {message : err})
    return next(createAxmi(result))
  }

}
