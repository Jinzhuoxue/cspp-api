import _    from 'underscore'
/*
 * Provide the function to create Axmi object according to the Magento example
*/
export default function(obj) {
  console.log('createAxmi In')
  console.dir(obj)
  let datacnt = _.isArray(obj) ? obj.length : (obj.errorCode ? 0 : 1)

  if(_.isEmpty(obj)){
  	console.log('inside if');
  	datacnt=0
  }

  //Remove all the own properties of obj
  obj = !obj || obj.errorCode ? [] : obj

  return {
    header : {
      datacnt : datacnt
    },
    datas : _.isArray(obj) ? obj : [obj]
  }
}
