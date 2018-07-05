import _ from 'underscore'
import joi from 'joi'
import S    from 'string'

import xmlparse           from '../xmlparse'
import {mapMagentoToSFDC, schemaCreate, schemaUpdate, validDataSource} from '../schema/newsletter'
import errors          from '../errors'
import convertOperationFields from '../utils/convertAxmiFieldToSFDC'

function toLowerCase (fields) {
  console.log('toLowerCase invoked')
  return _.map(fields, item => {
    if(item.name === 'email'){
      item.value = item.value.toLowerCase()
    }else if(item.name === 'personemail'){
      item.value = item.value.toLowerCase()
    }else if(item.name === 'email__c'){
      item.value = item.value.toLowerCase()
    }else if(item.name === 'email_nl__c'){
      item.value = item.value.toLowerCase()
    }
    return item
  })
}

export default async function(req, res, next) {

  let result
  try{

    console.log('invoked getData.xml');
    console.log(req.headers);
    console.dir('request body: '+req.body);
    console.log(req.body);

    result = req.body;

    console.log('<!----------Body Print Start--------------!>');
    console.dir(result);
    console.dir(result.header);

    console.log('<!----------Body Print End--------------!>');

    if(result.data && result.options){
      //remove the salesforce_id if it exists
      result.data = _.omit(result.data, 'salesforce_id')
      //validate the body with schema
      let schema = schemaCreate

      if(result.options.duplicate.action === 'insert'){
        schema = schemaCreate
      }else if(result.options.duplicate.action === 'update'){
        schema = schemaUpdate
      }

      const options = {
        allowUnknown: true,
        abortEarly: false
      }
      joi.validate(result.data, schema, options, (err, validated) => {
        if (err) {
          //res.boom.badRequest(err.message, err.details)
          next(_.extend(errors.badRequest, {message : err.message}))
        }else{
          //Additional valid for datasource
          if(result.data.datasource){
            let dtValues = S(result.data.datasource).splitLeft(';')
            console.log(dtValues)
            let intersection = _.intersection(dtValues,validDataSource)
            console.log(intersection)
            if(intersection.length !== dtValues.length){
              //res.boom.badRequest('bad value for datasource field')
              next(_.extend(errors.badRequest, {message : 'bad value for datasource field'}))
              return
            }
          }
          //Get the keys of result.data and convert the into sfdc field name
          let newKeys = _.keys(result.data)
                         .map(key => mapMagentoToSFDC[key] ? mapMagentoToSFDC[key]:key)
          let values  = _.values(result.data)

          result.data = _.object(newKeys, values)

          console.dir(result.data);
          next(result)
        }

      })

    }else{
      console.dir(result.options)
      //process the 'fields' operations
      //console.dir(result.options.fields);
      if(result.options.fields){
        result.options.fields = toLowerCase(result.options.fields)
        convertOperationFields(result.options.fields)
        console.dir(result.options.fields)
      }

      //process the 'or' operations
      if(result.options.or && !_.isEmpty(result.options.or)){
        result.options.or = toLowerCase(result.options.or)
        convertOperationFields(result.options.or)
        console.dir(result.options.or)
      }

      //process the 'and' operations
      if(result.options.and && !_.isEmpty(result.options.and)){
        console.log('result.options.and')
        result.options.and = toLowerCase(result.options.and)
        convertOperationFields(result.options.and)
        console.dir(result.options.and)
      }

      //process the 'order' operations
      if(!_.isEmpty(result.header.order)){
        result.header.order = _.extend(result.header.order,
                                          {value : mapMagentoToSFDC[result.header.order.value] ? mapMagentoToSFDC[result.header.order.value]:result.header.order.value})

        console.dir(result.header.order)
      }

      //convertOperationFields(result.options.add[0].fields)
      next(result)
    }

  }catch(err){
    console.dir(err)
    //res.boom.badRequest('Failed to parse the xml body of request')
    next(_.extend(errors.badRequest, {message : 'Failed to parse the xml body of request'}))
    return
  }

}
