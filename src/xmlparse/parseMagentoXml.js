import xml2js from 'xml2js'
import parseAxmi  from '../utils/parseAxmi'

export default async function(body){

  return new Promise(function(resolve, reject) {
    xml2js.parseString(body, function(err, result){
      if(err) {
        reject(err)
      }else{
        resolve(parseAxmi(result.axmi))
      }
    })
  })

}
