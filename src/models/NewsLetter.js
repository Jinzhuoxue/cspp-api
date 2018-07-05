import {db}   from '../database'
import config from '../config'
import errors from '../errors'
import _ from 'underscore'
import uniqid from 'uniqid'

async function verifyIfUserExists (email) {

  try{
    let res = await db(config.DB_TABLE.newsletter)
                      .where('personemail', email)
                      .count('personemail')
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
    let res = await dbHandler.select(keys || 'magento_rid__pc');

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

export async function findNewsLettter(email, keys, op){

  if(email){

    //Find the user by specified email and return the field value including in keys
    try {
      //console.log(keys)
      var res = null
      if(op === 'ne'){
        res = await db(config.DB_TABLE.newsletter)
                        .select(keys || 'magento_rid__pc')
                        .whereNot('personemail', email)
                        .limit(1);
      }else{
        res = await db(config.DB_TABLE.newsletter)
                        .select(keys || 'magento_rid__pc')
                        .where('personemail', email)
                        .limit(1);
      }
      //console.log(res[0])
      console.log('Successfully Entered for res[0]: '+JSON.stringify(res[0]));
      if(res && res.length > 0) {
        return res[0]
      }else{
        console.log('construct the response xml here.');
        // let elem = xml.element();
        // let stream = xml({ axmi: elem }, { stream: true });

        // let result = '<?xml version="1.0" encoding="utf-8"?><axmi>';

        // // let header = xml({ header: [obj.header] });

        // // let data = xml({ data: _.pairs(obj.data)
        // //                         .map(item => {return _.object([[item[0], {_cdata: item[1]}]])})
        // //                 });
        // let end = '</axmi>'
        // console.log(result + header + data + end)

        // //res.type('application/xml');
        // res.send(result + end);


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
    
    // console.log(db(config.DB_TABLE.newsletter)
    //                 .select(keys || 'sfid')
    //                 // .where('magento_rid__pc', id)
    //                 // .orWhere('magento_customer_id__c', _.isNaN(parseFloat(id)) ? -1 : parseFloat(id))
    //                 .where('sfid', id)
    //                 .limit(1).toString())
    var res = await db(config.DB_TABLE.newsletter)
                    .select(keys || 'sfid')
                    // .where('magento_rid__pc', id)
                    // .orWhere('magento_customer_id__c', _.isNaN(parseFloat(id)) ? -1 : parseFloat(id))
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


export async function findNewsLettterByRId(id, keys){

  //Find the user by specified email and return the field value including in keys
  try {
    
    // console.log(db(config.DB_TABLE.newsletter)
    //                 .select(keys || 'sfid')
    //                 .where('magento_rid__pc', id)
    //                 // .orWhere('magento_customer_id__c', _.isNaN(parseFloat(id)) ? -1 : parseFloat(id))
    //                 // .where('sfid', id)
    //                 .limit(1).toString())
    var res = await db(config.DB_TABLE.newsletter)
                    .select(keys || 'sfid')
                    .where('magento_rid__pc', id)
                    // .orWhere('magento_customer_id__c', _.isNaN(parseFloat(id)) ? -1 : parseFloat(id))
                    // .where('sfid', id)
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

export async function findNewsLettterByMagentoId(id, keys){

  //Find the user by specified email and return the field value including in keys
  try {
    /*console.log(db(config.DB_TABLE.newsletter)
                    .select(keys || 'sfid')
                    .where('magento_rid__pc', id)
                    .limit(1).toString())*/
    var res = await db(config.DB_TABLE.newsletter)
                    .select(keys || 'sfid')
                    // .where('magento_customer_id__c', id)
                    .where('magento_customer_id__c', _.isNaN(parseFloat(id)) ? -1 : parseFloat(id))
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

export async function findConflictedUserByEmail(email){

  console.log('findConflictedUserByEmail in by : ' + email)
  //Find the conflicted user by specified email and return the field value including in keys
  try {
    let keys = ['magento_rid__pc', 'sfid', 'email__c', 'club_card_number__pc', 'original_email__c', 'personemail', 'email_nl__pc', 'email_opt_in_status__pc']

    return await db(config.DB_TABLE.newsletter)
                    .select(keys)
                    .where('email__c', email)
                    .orWhere('original_email__c', email)
                    .orWhere('personemail', email)
                    .orWhere('email_nl__pc', email)

  } catch (err) {
    console.error('error running query', err);
    return _.extend(errors.databaseServerError, {message : err})
  }

}

async function resolvedConflictedUserOnInsertForCondition4(oldUser1, oldUser2, newUser, email){

  console.log('resolvedConflictedUserOnInsertForCondition4 In')
  if(_.isEmpty(oldUser1) || _.isEmpty(oldUser2)) return

  console.dir(oldUser1)
  console.dir(oldUser2)
  let sfAccount1, sfAccount2

  if(oldUser1.email__c == email && oldUser2.email__c != email){
    sfAccount2 = oldUser1;
  }else if(oldUser1.original_email__c == email && oldUser1.personemail == email &&
          (oldUser1.email_opt_in_status__pc == 'a' || oldUser1.email_opt_in_status__pc == 'u')){
    sfAccount1 = oldUser1;
  }

  if(oldUser2.email__c == email && oldUser1.email__c != email){
    sfAccount2 = oldUser2;
  }else if(oldUser2.original_email__c == email && oldUser2.personemail == email &&
          (oldUser2.email_opt_in_status__pc == 'a' || oldUser2.email_opt_in_status__pc == 'u')){
    sfAccount1 = oldUser2;
  }

  console.dir(sfAccount1)
  console.dir(sfAccount2)
  //return when both condition4 and condition 4bis do not matched
  if(!sfAccount1 || !sfAccount2 || sfAccount1 == sfAccount2) return

  if(sfAccount1.email_opt_in_status__pc == 'u'){
    //Condition 4bis
    console.log('Trigger Condition 4bis')
    newUser.email_opt_in_status__pc = 'a'
    newUser.email_confirmation_timestamp__pc = new Date().toISOString()
    newUser.email_nl__pc = email
    return db(config.DB_TABLE.newsletter)
                      .returning(['magento_rid__pc'])
                      /*.where('email__c', email)
                      .where('personemail', email)
                      .where('original_email__c', email)
                      .where('email_opt_in_status__pc', 'u')*/
                      .where('sfid', sfAccount1.sfid)
                      .update(newUser)
  }else{
    // Do nothing for condition 4
    console.log('Trigger Condition 4')
    return await db(config.DB_TABLE.newsletter)
                       .returning(['magento_rid__pc'])
                       //.where('email__c', email)
                       .where('sfid', sfAccount1.sfid)
  }
}

async function resolvedConflictedUserOnInsert(oldUser, newUser, email){

  console.log('resolvedConflictedUserOnInsert Invoked')
  if(!_.isObject(oldUser) || _.isEmpty(oldUser)) return

  if(oldUser.email__c == email){
    //Condition 6 : use update instead insert opeartion
    if(oldUser.original_email__c != email && oldUser.personemail != email){
      console.log('Trigger Condition 6')
      newUser.email_opt_in_status__pc = 'h'
      newUser.email_request_timestamp__pc = new Date().toISOString()
      newUser.personemail = email
      newUser.email_nl__pc = email

      return await db(config.DB_TABLE.newsletter)
                        // .returning(['personemail'])
                        .returning(['magento_rid__pc'])
                        /*.where('email__c', email)
                        .where(function(){
                          this.whereNot('personemail', email).orWhereNull('personemail')
                        })
                        .where(function(){
                          this.whereNot('original_email__c', email).orWhereNull('original_email__c')
                        })*/
                        //.whereNot('personemail', email)
                        //.whereNot('original_email__c', email)
                        .where('sfid', oldUser.sfid)
                        .update(newUser)
    }
    else if(oldUser.original_email__c == email && oldUser.personemail == email){
      if(oldUser.email_opt_in_status__pc == 'a'){
        console.log('Trigger Condition 2')
        return await db(config.DB_TABLE.newsletter) 
                           .returning(['magento_rid__pc'])     
                           //.where('email__c', email)     
                           //.where('personemail', email)      
                           //.where('original_email__c', email)      
                           //.where('email_opt_in_status__pc', 'u')      
                           .where('sfid', oldUser.sfid)
      }
      //C2bis
      else if(oldUser.email_opt_in_status__pc == 'u'){
        //Update the existing user
        console.log('Trigger Condition 2bis')
        newUser.email_opt_in_status__pc = 'h'
        newUser.email_request_timestamp__pc = new Date().toISOString()
        newUser.email_nl__pc = email

        return await db(config.DB_TABLE.newsletter)
                          .returning(['magento_rid__pc'])
                          //.where('email__c', email)
                          //.where('personemail', email)
                          //.where('original_email__c', email)
                          //.where('email_opt_in_status__pc', 'u')
                          .where('sfid', oldUser.sfid)
                          .update(newUser)

      }
    }


    //C1
    console.log('Trigger Condition 1 invoked')
    newUser.email_opt_in_status__pc = 'h'
    newUser.email_request_timestamp__pc = new Date().toISOString()
    newUser.email_nl__pc = email
    newUser.personemail = email

    return await db(config.DB_TABLE.newsletter)
                      .returning(['magento_rid__pc'])
                      //.where('email__c', email)
                      .where('sfid', oldUser.sfid)
                      .update(newUser)
  }else if(oldUser.original_email__c == email && oldUser.personemail == email){
    if(oldUser.email_opt_in_status__pc == 'a'){
      console.log('Trigger Condition 2')
      return await db(config.DB_TABLE.newsletter) 
                       .returning(['magento_rid__pc'])     
                       //.where('email__c', email)     
                       .where('sfid', oldUser.sfid)
    }
    //C2bis
    else if(oldUser.email_opt_in_status__pc == 'u'){
      //Update the existing user
      console.log('Trigger Condition 2bis>>>')
      newUser.email_opt_in_status__pc = 'h'
      newUser.email_request_timestamp__pc = new Date().toISOString()
      newUser.email_nl__pc = email

      return await db(config.DB_TABLE.newsletter)
                        .returning(['magento_rid__pc'])
                        //.whereNot('email__c', email)
                        /*.where(function(){
                          this.whereNot('email__c', email).orWhereNull('email__c')
                        })
                        .where('personemail', email)
                        .where('original_email__c', email)
                        .where('email_opt_in_status__pc', 'u')*/
                        .where('sfid', oldUser.sfid)
                        .update(newUser)

    }
  }
  else{
    console.log('Trigger Condition 7')
    newUser.magento_rid__pc = uniqid()
    if(!newUser.lastname){
      newUser.lastname = '0';
    }

    newUser.email_opt_in_status__pc = 'h'
    newUser.email_request_timestamp__pc = new Date().toISOString()
    newUser.email_nl__pc = email
    newUser.personemail = email
    return await db(config.DB_TABLE.newsletter)
                      .returning(['magento_rid__pc'])
                      .insert(newUser)
  }
}

async function resolvedConflictedUserOnUpdate(oldUser, newUser, email){

  if(!_.isObject(oldUser) || _.isEmpty(oldUser) || !_.isObject(newUser) || _.isEmpty(newUser) ) return

  console.log('resolvedConflictedUserOnUpdate In');

  if( oldUser.club_card_number__pc == newUser.club_card_number__pc &&
      oldUser.personemail != newUser.personemail &&
      oldUser.email_nl__pc != newUser.email_nl__pc &&
      oldUser.personemail == email &&
      oldUser.email_nl__pc == email &&
      oldUser.original_email__c == email)
  {
    //[Update] Condition 5: Link Account2 to Account1 with CC
    if(oldUser.email_opt_in_status__pc == newUser.email_opt_in_status__pc &&
     (oldUser.email_opt_in_status__pc == 'a' || oldUser.email_opt_in_status__pc == 'u' )){
       console.log('Trigger Condition 5')

       newUser.original_email__c = oldUser.original_email__c

       return await db(config.DB_TABLE.newsletter)
                         .returning(['personemail'])
                         /*.where('personemail', email)
                         .where('email_nl__pc', email)
                         .where('original_email__c', email)
                         .where('club_card_number__pc', newUser.club_card_number__pc)*/
                         .where('sfid', oldUser.sfid)
                         .update(newUser)
     }
     //[Update] Condition 5ter: Link Account2 to Account1 with CC
     else if(oldUser.email_opt_in_status__pc == 'u' && newUser.email_opt_in_status__pc == 'a' ){
       console.log('Trigger Condition 5bis')
       newUser.original_email__c = oldUser.original_email__c
       newUser.email_confirmation_timestamp__pc = new Date().toISOString()
       return await db(config.DB_TABLE.newsletter)
                         .returning(['personemail'])
                         /*.where('personemail', email)
                         .where('email_nl__pc', email)
                         .where('original_email__c', email)
                         .where('club_card_number__pc', newUser.club_card_number__pc)*/
                         .where('sfid', oldUser.sfid)
                         .update(newUser)
     }
     //[Update] Condition 5ter: Link Account2 to Account1 with CC
     else if(oldUser.email_opt_in_status__pc == 'a' && newUser.email_opt_in_status__pc == 'u' ){
       console.log('Trigger Condition 5ter')
       newUser.email_nl__pc = email
       newUser.personemail = email
       newUser.original_email__c = email
       newUser.email_opt_in_status__pc = oldUser.email_opt_in_status__pc

       return await db(config.DB_TABLE.newsletter)
                         .returning(['personemail'])
                         /*.where('personemail', email)
                         .where('email_nl__pc', email)
                         .where('original_email__c', email)
                         .where('club_card_number__pc', newUser.club_card_number__pc)*/
                         .where('sfid', oldUser.sfid)
                         .update(newUser)
     }
     //[UPDATE] Condition 3: Merge Account2 to Account1 with CC
     else if(newUser.email__c != oldUser.email__c &&
       oldUser.personemail == oldUser.original_email__c &&
       oldUser.personemail == oldUser.email_nl__pc
     ){
       console.log('Trigger Condition 3')
       oldUser.email__c = newUser.email__c
       //newUser.original_email__c = email
       //newUser.personemail = email
       //newUser.email_nl__pc = email

       return await db(config.DB_TABLE.newsletter)
                         .returning(['personemail'])
                         /*.where(function() {
                            this.where('personemail', email).orWhere('original_email__c', email).orWhere('email_nl__pc', email)
                          })*/
                         //.where('club_card_number__pc', newUser.club_card_number__pc)
                         .where('sfid', oldUser.sfid)
                         .update(oldUser)
     }
  }
  //[UPDATE] Condition 3: Merge Account2 to Account1 with CC
  else if(oldUser.club_card_number__pc == newUser.club_card_number__pc  &&
      newUser.email__c != oldUser.email__c &&
      oldUser.personemail == oldUser.original_email__c &&
      oldUser.personemail == oldUser.email_nl__pc
  ){
    console.log('Trigger Condition 3')
    oldUser.email__c = newUser.email__c
    //oldUser.original_email__c = email
    //oldUser.personemail = email
    //oldUser.email_nl__pc = email

    return await db(config.DB_TABLE.newsletter)
                      .returning(['personemail'])
                      //.where('club_card_number__pc', newUser.club_card_number__pc)
                      .where('sfid', oldUser.sfid)
                      .update(oldUser)
  }
  else{
    console.log('No Condition Matched Update Action')
    return await db(config.DB_TABLE.newsletter)
                      .returning(['personemail'])
                      /*.where('email__c', email)
                      .orWhere('original_email__c', email)
                      .orWhere('personemail', email)
                      .orWhere('email_nl__pc', email)*/
                      .where('sfid', oldUser.sfid)
                      .update(newUser)
  }
}

export async function createUser(user, email){
  console.log('createUser In')
  console.dir(email)
  let rid = uniqid()
  try {
    let found
    if(email){
      found = await findConflictedUserByEmail(email.value)
    }else{
      found = await findNewsLettter(user.personemail)
    }

    console.dir(found)
    if(!found || found.length == 0){
      user.magento_rid__pc = rid
      //Set the default email_opt_in_status__pc to 'h'
      if(!user.email_opt_in_status__pc){
        user.email_opt_in_status__pc = 'h'
        user.email_request_timestamp__pc = new Date().toISOString()
      }

      if(_.isArray(found)){
        user.personemail = email.value
        user.email_nl__pc = email.value
      }
      //Set the default lastname to '0' when the lastname is missing in request
      if(!user.lastname){
        user.lastname = '0';
      }
      //if the datasource is not empty or newsletter_incentive=1 then we have to
      //always make the field Opt In Communication Email = true
      // if(user.magento_data_source__pc || user.magento_newsletter_incentive__pc === 1){
      //   user.magento_opt_in_communication_email__pc = true
      // }
      //conole.log(user);
      let res = await db(config.DB_TABLE.newsletter)
                        .returning(['magento_rid__pc'])
                        .insert(user)
      console.dir(res[0])

      return {id: res[0].magento_rid__pc, successInfo : 'OK'}
    }else{
      //return {}
      if(_.isArray(found)){
        let res
        if(found.length === 2){
          res = await resolvedConflictedUserOnInsertForCondition4(found[0], found[1], user, email.value)
          console.dir(res)
        }else{
          res = await resolvedConflictedUserOnInsert(found[0], user, email.value)
          console.dir(res)
        }

        /*for(let i=0; i<found.length; i++){
          let res = await resolvedConflictedUserOnInsert(found[i], user, email.value)
          console.dir(res)
        }*/

        // return {successInfo : 'OK'}

        if(_.isArray(res) && !_.isEmpty(res))     
           return {id: res[0].magento_rid__pc, successInfo : 'OK'}     
        else if(_.isArray(res) && _.isEmpty(res))     
           return {successInfo : 'OK'}
      }else{
        return errors.alreadyExist
      }
    }
  } catch (err) {
    return _.extend(errors.databaseServerError, {message : err})
  }

}
/* 
* @Last Modified: Sanchit Dua <sanchit.dua@capgemini.com>
* @params: data, rid, email, magentocustomer_id, id
*/
export async function updateUser(user, rid, email, magentoid, id){

  console.log('updateUser by Id:' + rid)
  //If user is null or has no key, return noFieldToBeUpdated
  if(!_.isObject(user) || _.isEmpty(user)) return errors.noFieldToBeUpdated

  console.log(rid, email)

  try {
    let found

    if(!rid && email && !magentoid && !id){
      found = await findConflictedUserByEmail(user.personemail)
    }else if(rid){
      found = await findNewsLettterByRId(rid)
    } else if(magentoid){
      found = await findNewsLettterByMagentoId(magentoid)
    } else if(id){
      found = await findNewsLettterById(id)
    }


    if(!found){
      return errors.notFound
    }else{
      //if the datasource is not empty or newsletter_incentive=1 then we have to
      //always make the field Opt In Communication Email = true
      // if(user.magento_data_source__pc || user.magento_newsletter_incentive__pc === 1){
      //   user.magento_opt_in_communication_email__pc = true
      // }

      if(_.isArray(found)){
        /*if(!user.lastname){
          user.lastname = '0';
        }*/

        for(let i=0; i<found.length; i++){
          let res = await resolvedConflictedUserOnUpdate(found[i], user, email.value)
          console.dir(res)
        }

        return {successInfo : 'OK'}
      }else{

        /*if(!user.lastname){
          user.lastname = '0';
        }*/

        let res = null 
        if(rid){
          res = await updateByRId(rid, user)
        } else if(magentoid){
          res = await updateByMagentoId(magentoid, user)
        } else if(id){
          res = await updateById(id, user)
        }

        console.log('Successfully Entered.');
        return {successInfo : 'OK'}
      }
    }
  } catch (err) {
    return _.extend(errors.databaseServerError, {message : err})
  }
}


/*
* @author Sanchit Dua <sanchit.dua@capgemini.com>
* @created 020118

*/
export async function updateByRId(id, user){

  try {
    
    await db(config.DB_TABLE.newsletter)
                          .returning(['magento_rid__pc'])
                          .where('magento_rid__pc', id)
                          .limit(1)
                          .update(user)
  } catch (err) {
    console.error('error running query', err);
    return _.extend(errors.databaseServerError, {message : err})
  }

}


/*
* @author Sanchit Dua <sanchit.dua@capgemini.com>
* @created 020118

*/
export async function updateByMagentoId(id, user){

  try {
    
    await db(config.DB_TABLE.newsletter)
                          .returning(['magento_customer_id__c'])
                          .where('magento_customer_id__c', _.isNaN(parseFloat(id)) ? -1 : parseFloat(id))
                          .limit(1)
                          .update(user)
  } catch (err) {
    console.error('error running query', err);
    return _.extend(errors.databaseServerError, {message : err})
  }

}

/*
* @author Sanchit Dua <sanchit.dua@capgemini.com>
* @created 020118

*/
export async function updateById(id, user){

  try {
    
    await db(config.DB_TABLE.newsletter)
                          .returning(['sfid'])
                          .where('sfid', id)
                          .limit(1)
                          .update(user)
  } catch (err) {
    console.error('error running query', err);
    return _.extend(errors.databaseServerError, {message : err})
  }

}
