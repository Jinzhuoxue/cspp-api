import _ from 'underscore'
import S from 'string'

/*
 * Provide the function to parse 'duplicate' XML element
*/
const parseDuplicate = function(duplicate){
  return _.keys(duplicate)
          .map(item => duplicate[item])
          .reduce((memo, prop) => _.extend(memo, prop), {})
}

/*
 * Provide the function to parse 'field' XML elements
*/
const parseOrder = function(orders){
  return _.map(orders, order => {
           return _.keys(order)
                  .map(item => {
                    if(item === '_'){
                      return {value : order[item]}
                    }else if(item === '$'){
                      return order[item]
                    }
                  })
                  .reduce((memo, prop) => _.extend(memo, prop), {})
          })
}

/*
 * Provide the function to parse 'field' XML elements
*/
const parseFileds = function(fields){
  return _.map(fields, field => {
           return _.keys(field)
                  .map(item => {
                    if(item === '_'){
                      return {value : field[item]}
                    }else if(item === '$'){
                      return field[item]
                    }
                  })
                  .reduce((memo, prop) => _.extend(memo, prop), {})
          })
}

/*
 * Provide the function to parse 'header' XML element
*/
const parseHeader = function(header){

  return {
    vers : header.vers ? header.vers[0] : null,
    order: parseOrder(header.order),
    limit: header.limit,
    show : header.show ? S(header.show[0]).splitLeft(',') : null,
    confirm_url : header.confirm_url
  }
}

/*
 * Provide the function to parse 'or' XML elements
*/
const parseOrOption = function(or){
  console.dir(or[0].field)
  return _.map(or, item =>
          _.keys(item)
          .map(field => {
            console.dir(field)
            if(field === 'field'){
              console.dir(item[field])
              return {fields : parseFileds(item[field])}
            }
          })
          .reduce((memo, prop) => _.extend(memo, prop), {})
        )
}

/*
 * Provide the function to parse 'or' XML elements
*/
const parseAndOption = function(and){

  return _.map(and, item =>
          _.keys(item)
          .map(field => {
            console.dir(field)
            if(field === 'field'){
              console.dir(item[field])
              return {fields : parseFileds(item[field])}
            }
          })
          .reduce((memo, prop) => _.extend(memo, prop), {})
        )
}

/*
 * Provide the function to parse 'options' XML elements
*/
const parseOptions = function(options){

  return _.keys(options)
          .map(item => {
            if(item === 'duplicate'){
              return {duplicate : parseDuplicate(options[item][0])}
            }else if(item === 'field'){
              return {fields : parseFileds(options[item])}
            }else if(item === 'id'){
              return {id : options[item][0]}
            }else if(item === 'rid'){
              return {rid : options[item][0]}
            }else if(item === 'magentocustomer_id'){
              return {magentocustomer_id : options[item][0]}
            }else if(item === 'or'){
              console.dir(options.or)
              return {or : parseOrOption(options[item])}
            }else if(item === 'and'){
              console.dir(options.and)
              return {and : parseOrOption(options[item])}
            }
          })
          .reduce((memo, prop) => _.extend(memo, prop), {})
}

/*
 * Provide the function to parse 'data' XML element
*/
const parseData = function(data){
  return _.mapObject(data, (val, key) => {
    return val[0]
  })
}

/*
 * Provide the function to parse XML element body defined by Magento
*/
export default function(obj) {

  return _.object(_.keys(obj),
                  _.keys(obj)
                  .map(item => {
                    if(item === 'header'){
                      return parseHeader(obj[item][0])
                    }else if(item === 'options'){
                      return parseOptions(obj[item][0])
                    }else if(item === 'data'){
                      return parseData(obj[item][0])
                    }
                  }))
}
