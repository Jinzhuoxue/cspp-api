import _    from 'underscore'
import {mapMagentoToSFDC} from '../schema/newsletter'
/*
 * Provide the function to convert Axmi fields according to SFDC schema
*/
export default function(fields) {
  _.map(fields, item => _.extend(item, {name : mapMagentoToSFDC[item.name] ? mapMagentoToSFDC[item.name]:item.name}))
}
