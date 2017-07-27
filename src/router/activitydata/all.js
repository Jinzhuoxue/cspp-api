export default async function(req, res, next) {

  let { page, perPage, sort = '', fields = '' } = req.query

  page = parseInt(page) || 0
  perPage = parseInt(perPage) || 20

  sort = sort.replace(',', ' ')
  fields = fields.replace(',', ' ')

  //TODO: access invoke the REST Marketing Cloud API and receive the JSON payload
  //let result = await retrieveActivityData(page, perPage, sort, fields);
  let result = [];

  if(!result){
    return next();
  }else if(result.code){
    return next({message : result.detail});
  }else{
    res.send(result);
  }
}
