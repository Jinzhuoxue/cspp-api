import _ from 'underscore'
import {OAuth, DataService} from 'forcejs';
import errors          from '../../errors'

export default async function(req, res, next) {

  console.dir(req)

  try{
    
    let result = [{}, {}, {}]

    if(!result){
      return next()
    }else if(result.code){
      return next({message : result.detail})
    }else{
      res.send(result);
    }
  }catch(err){
    let result = _.extend(errors.internalServerError, {message : err})
    return next(result)
  }


}
