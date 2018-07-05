import _ from 'underscore'

import {findNewsLettter, findNewsLettteByWhere}  from '../../models/NewsLetter'
import createAxmi         from '../../utils/createAxmi'
import errors          from '../../errors'

import {mapMagentoToSFDC, mapSFDCToClient} from '../../schema/newsletter'

export default async function(axmi, req, res, next) {

  //const reqJson = await xmlparse.parseMagentoXml(req.body)
  console.dir('get Data In');
  if(axmi.errorCode){
    return next(createAxmi(axmi))
  }

  console.dir(axmi.options);
  const {fields, and, or} = axmi.options
  console.dir(fields);
  console.dir(and);
  console.dir(or);

  const keys  = _.map(axmi.header.show, key => mapMagentoToSFDC[key] ? mapMagentoToSFDC[key]:key)
  const order = !_.isEmpty(axmi.header.order) ? axmi.header.order : null;
  const limit = !_.isEmpty(axmi.header.limit) ? axmi.header.limit : null;

  let result
  try{
    result = await findNewsLettteByWhere({keys, fields, and, or, order, limit})
    if(!result){

      return next(createAxmi(errors.notFound))
    }

    //Convert the result
    result = _.map(result, item => {
      let newKeys = _.keys(item)
                     .map(key => mapSFDCToClient[key] ? mapSFDCToClient[key] : key)
      let values  = _.values(item)
      return _.object(newKeys, values)
    })

    console.log(result);
    console.log('Convert the result');

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
