import _    from 'underscore'
import S    from 'string'
import xml  from 'xml'
import {mapSFDCToClient} from '../schema/newsletter'

/*
 * Provide the function to wrapper the response object and convert it into an xml
 * Example :
      <?xml version="1.0" encoding="utf-8"?>
      <axmi>
          <header>
              <datacnt>1</datacnt>
          </header>
          <data>
              <id><![CDATA[23776]]></id>
              <successInfo><![CDATA[OK]]></successInfo>
          </data>
      </axmi>
*/

export default function(obj, req, res, next){

    if(!obj || !obj.header || !obj.datas){
      next()
      return
    }

    /*let start = '<?xml version="1.0" encoding="utf-8"?><axmi>'
    //
    let header = xml({ header: [obj.header] })
    console.dir(obj.datas)
    let dataXML = _.map(obj.datas, data => xml({ data: _.pairs(data)
                                          .map(item => {return _.object([[item[0], {_cdata: item[1]==null ? item[1] : S(item[1])}]])})
                                  }))
                   .join('')

    let end = '</axmi>'*/

    res.send(obj);
  }
