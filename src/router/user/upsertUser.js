import _ from 'underscore'

import {createUser, updateUser, findNewsLettter}  from '../../models/NewsLetter'
import createAxmi         from '../../utils/createAxmi'
import xmlparse           from '../../xmlparse'
import errors          from '../../errors'
import {mapMagentoToSFDC, mapSFDCToClient} from '../../schema/newsletter'

export default async function(axmi, req, res, next) {

  //const axmi = await xmlparse.parseMagentoXml(req.body)
  console.dir(axmi.data)
  console.dir(axmi.options)

  if(axmi.errorCode){
    return next(createAxmi(axmi))
  }

  let result
  try{

    // 1) when the action equal to 'insert', invoke createUser function
    // 2) when the action equal to 'update', invoke createUser function
    if(axmi.options){
      if(axmi.options.duplicate){

        //check if existing fields
        let email
        console.dir(axmi.options.fields)
        if(axmi.options.fields && !_.isEmpty(axmi.options.fields)){
          email = _.first(_.filter(axmi.options.fields, item => item.name === 'email'))
          //make the email value to lowercase
          if(email && email.value){
            email.value = email.value.toLowerCase()
          }
        }
        if(axmi.options.duplicate.action === 'insert'){
          result = await createUser(axmi.data, email)
        }else if(axmi.options.duplicate.action === 'update'){
          if(axmi.options.rid){
            // data, rid, email, magentocustomer_id, id
            result = await updateUser(axmi.data, axmi.options.rid, email, null, null)
          }else if(axmi.options.magentocustomer_id){
            // data, rid, email, magentocustomer_id, id
            result = await updateUser(axmi.data, null, email, axmi.options.magentocustomer_id, null)
          }else{
            // data, rid, email, magentocustomer_id, id
            result = await updateUser(axmi.data, null, email, null, axmi.options.id)
          }

          /*if(axmi.options.id){
            result = await updateUser(axmi.data, axmi.options.id, email)
          }else{
            return next(createAxmi(errors.noIdProvided))
          }*/
        }
      }
      else {
        const email = _.first(_.filter(axmi.options.fields, item => item.name === 'email'))
        const keys  = _.map(axmi.header.show, key => mapMagentoToSFDC[key] ? mapMagentoToSFDC[key]:key)
        console.log('keys: '+keys);
        if(email)
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
      }
    }

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
