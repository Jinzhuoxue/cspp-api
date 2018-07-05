import {findNewsLettter} from '../../models/NewsLetter'

export default async function(req, res, next) {

  console.log('Request:', req.query);

  const { email } = req.params || req.query

  if(!email){
    res.boom.badRequest('Email param missing');
    return;
  }else{
    let result = await findNewsLettter(email);

    if(!result){
      return next();
    }else if(result.code){
      return next({message : result.detail});
    }else{
      res.json(result);
    }
  }
}
