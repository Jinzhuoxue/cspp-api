import {db}   from '../database'
import config from '../config'
import errors from '../errors'
import _ from 'underscore'
import uniqid from 'uniqid'

async function verifyIfUserExists (email, phone) {

  try{
    let res = await db(config.DB_TABLE.newsletter)
                      .where('email', email)
                      .orWhere('phone', phone)
                      .count('id')
    return (res.rows[0] && res.rows[0].count > 0) ? true : false;
  }catch(err){
    return false
  }
}


function appendWhere(name, value, op){
  console.log('appendWhere In',name, value, op)
  if(op === 'eq'){
    return this.where(name, value)
  }
  else if(op === 'ne'){
    return this.whereNot(name, value)
  }
  else if(op === 'ge'){
    return this.where(name, '>=', value)
  }
  else if(op === 'le'){
    return this.where(name, '<=', value)
  }
  else if(op === 'gt'){
    return this.where(name, '>', value)
  }
  else if(op === 'lt'){
    return this.where(name, '<', value)
  }
  else if(op === 'li'){
    return this.where(name, 'like', value)
  }
  else if(op === 'un'){
    return this.whereNot(name, 'like', value)
  }
}

function orWhere(name, value, op){
  console.log('appendWhere In',name, value, op)
  if(op === 'eq'){
    return this.orWhere(name, value)
  }
  else if(op === 'ne'){
    return this.orWhereNot(name, value)
  }
  else if(op === 'ge'){
    return this.orWhere(name, '>=', value)
  }
  else if(op === 'le'){
    return this.orWhere(name, '<=', value)
  }
  else if(op === 'gt'){
    return this.orWhere(name, '>', value)
  }
  else if(op === 'lt'){
    return this.orWhere(name, '<', value)
  }
  else if(op === 'li'){
    return this.orWhere(name, 'like', value)
  }
  else if(op === 'un'){
    return this.orWhereNot(name, 'like', value)
  }
}

export async function findNewsLettteByWhere(query){

  const {keys, fields, and, or, order, limit} = query
  //Find the user by specified email and return the field value including in keys
  try {

    let dbHandler = db(config.DB_TABLE.newsletter)

    if(fields && !_.isEmpty(fields)){
      _.reduce(fields, (handler, field) => appendWhere.call(handler, field.name, field.value, field.op), dbHandler)
    }

    if(or && !_.isEmpty(or)){
      dbHandler.where(function() {
          _.reduce(or, (handler, field) => orWhere.call(handler, field.name, field.value, field.op), this)
      })
    }

    if(and && !_.isEmpty(and)){
      dbHandler.where(function() {
          _.reduce(and, (handler, field) => appendWhere.call(handler, field.name, field.value, field.op), this)
      })
    }

    if(_.isObject(order)){
      dbHandler.orderBy(order.value, order.dir)
    }

    if(limit){
      dbHandler.limit(limit)
    }

    console.log(dbHandler.toSQL())
    let res = await dbHandler.select(keys || ['sfid', 'phone', 'email']);

    if(res && res.length > 0) {
      return res
    }else{
      return null
    }
  } catch (err) {
    console.error('error running query', err);
    return _.extend(errors.databaseServerError, {message : err})
  }

}

export async function verifyNewsLettter(user, keys){

  let {email, phone, password} = user

  if((email || phone) && password){

    //Find the user by specified email or phone return the field value including in keys
    try {
      //console.log(keys)
      let res = null
      if(email){
        res = await db(config.DB_TABLE.newsletter)
                    .select(keys || ['sfid', 'phone', 'email'])
                    .where('password', password)
                    .where('email', email)
                    .limit(1)
      }else if(phone){
        res = await db(config.DB_TABLE.newsletter)
                  .select(keys || ['sfid', 'phone', 'email'])
                  .where('password', password)
                  .where('phone', phone)
                  .limit(1)
      }
      console.dir(res[0])

      console.log('Successfully Entered for res[0]: '+JSON.stringify(res[0]));
      if(res && res.length > 0) {
        return res[0]
      }else{

        return null
      }
    } catch (err) {
      console.error('error running query', err);
      return _.extend(errors.databaseServerError, {message : err})
    }
  } else{
    return null;
  }

}

export async function findNewsLettter(user, keys){

  let {email, phone, password} = user

  if(email || phone){

    //Find the user by specified email or phone return the field value including in keys
    try {
      console.log(`Find BY:${email} or ${phone}`)

      let res = await db(config.DB_TABLE.newsletter)
      .select(keys || ['sfid', 'phone', 'email'])
      .where('email', email)
      .orWhere('phone', phone)
      .limit(1)

      console.dir(res)

      console.log('Successfully Entered for res[0]: '+JSON.stringify(res[0]));
      if(res && res.length > 0) {
        return res[0]
      }else{

        return null
      }
    } catch (err) {
      console.error('error running query', err);
      return _.extend(errors.databaseServerError, {message : err})
    }
  } else{
    return null;
  }

}

export async function findNewsLettterById(id, keys){

  //Find the user by specified email and return the field value including in keys
  try {

    var res = await db(config.DB_TABLE.newsletter)
                    .select(keys || ['sfid', 'phone', 'email'])
                    .where('sfid', id)
                    .limit(1);
    console.log(res[0])

    if(res && res.length > 0) {
      return res[0]
    }else{
      return null
    }
  } catch (err) {
    console.error('error running query', err);
    return _.extend(errors.databaseServerError, {message : err})
  }

}

export async function createUser(user){
  console.log('createUser In')
  let {email, phone, password} = user
  try {
    let found = await findNewsLettter(user)

    console.log('findNewsLettter end')

    if(!found){

      console.dir(found)

      let res = await db(config.DB_TABLE.newsletter)
                        .returning(['sfid', 'phone', 'email'])
                        .insert(user)
      console.dir(res[0])

      return res[0]
    }else{
      console.dir(errors.alreadyExist)
      return errors.alreadyExist
    }
  } catch (err) {
    return _.extend(errors.databaseServerError, {message : err})
  }

}

export async function updateUser(user){

  //If user is null or has no key, return noFieldToBeUpdated
  if(!_.isObject(user) || _.isEmpty(user)) return errors.noFieldToBeUpdated

  let {email, phone, password} = user

  try {
    let found = await findNewsLettter(user)

    if(!found){
      return errors.notFound
    }else{
      let res = await db(config.DB_TABLE.newsletter)
                      .returning(['sfid', 'phone', 'email'])
                      .where('password', password)
                      .where(function(){
                        this.where('email', email).orWhere('phone', phone)
                      })
                      .update(user)
    }
  } catch (err) {
    return _.extend(errors.databaseServerError, {message : err})
  }
}
