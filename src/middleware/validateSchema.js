import joi from 'joi'
import _ from 'underscore'

export default function(schema, obj, req, res, next){

    console.log('validate schema in')

    console.dir(schema)

    console.dir(obj)

    if(!schema){
      return next(boom.badRequest('No validate schema provided'))
    }

    const options = {
      allowUnknown: true,
      abortEarly: false
    }

    Joi.validate(obj, schema, options, (err, validated) => {
      if (err) {
        return next(boom.badRequest(err.message, err.details))
      }
      next(obj)
    })
  }
