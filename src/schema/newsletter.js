import Joi from 'joi'

export const schemaCreate = {
  // required
  password: Joi.string().required().min(6).max(18),
  email: Joi.string().email(),
  // optional
  phone: Joi.string().max(40).allow(''),
  username: Joi.string().max(40).allow('')
}

export const schemaUpdate = {
    // required
    email: Joi.string().email(),
    // optional
    phone: Joi.string().max(40).allow(''),
    username: Joi.string().max(40).allow(''),
    password: Joi.string().required().min(6).max(18).allow('')
}

//export const validDataSource = ['ACO','BUY','OL','KAF','KE']
