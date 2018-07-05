import Joi from 'joi'

export const mapMagentoToSFDC = {
  rid   : 'magento_rid__pc',
  id    : 'magento_rid__pc',
  email : 'personemail',
  first : 'firstname',
  last  : 'lastname',
  zip : 'personmailingpostalcode',
  city  : 'personmailingcity',
  birth : 'personbirthdate',
  title  : 'salutation',
  lang  : 'magento_language__pc',
  datasource : 'magento_data_source__pc',
  status : 'email_opt_in_status__pc',
  newsletter_incentive : 'magento_newsletter_incentive__pc',
  addi : 'magento_addi__pc',
  customer_number : 'def_customer_id__c',
  lastchange : 'def_id_last_modification_user__pc',
  salescloud_id : 'sfid',
  commercecloud_id : 'commercecloud_id__c',
  magentocustomer_id : 'magento_customer_id__c',
  clubcardnumber : 'club_card_number__pc',
  magento_email : 'email__c',
  defacto_email : 'original_email__c',
  email_nl : 'email_nl__pc'
}

export const mapSFDCToClient = {
  magento_rid__pc   : 'rid',
  personemail : 'email',
  firstname : 'first',
  lastname  : 'last',
  personmailingpostalcode : 'zip',
  personmailingcity : 'city',
  personbirthdate : 'birth',
  salutation : 'title',
  magento_language__pc : 'lang',
  magento_data_source__pc  : 'datasource',
  email_opt_in_status__pc : 'status',
  magento_newsletter_incentive__pc : 'newsletter_incentive',
  magento_addi__pc : 'addi',
  def_customer_id__c : 'customer_number',
  def_id_last_modification_user__pc : 'lastchange',
  email__c : 'email_magento',
  sfid : 'salescloud_id',
  commercecloud_id__c : 'commercecloud_id',
  magento_customer_id__c : 'magentocustomer_id',
  club_card_number__pc : 'clubcardnumber',
  email__c : 'magento_email',
  original_email__c : 'defacto_email',
  email_nl__pc : 'email_nl'
}

export const schemaCreate = {
  // required
  email: Joi.string().email().allow(''),
  // last: Joi.string().required().min(1).max(80),
  // optional
  // last: Joi.string().min(1).max(80),
  last: Joi.string().max(40).allow(''),
  first: Joi.string().max(40).allow(''),
  zip: Joi.string().allow(''),
  city: Joi.string().allow(''),
  birth: Joi.date().allow(''),
  title: Joi.string().valid(['Mr.','Ms.','Mrs.','Dr.','Prof.','Frau','Herr']).allow(''),
  status: Joi.string().valid(['a','i','u','h','l','d']).allow(''),
  lang: Joi.string().valid(['de', 'cs', 'sk', 'pl', 'hu', 'ro', 'ch', 'at', 'fr', 'cz']).allow(''),
  datasource: Joi.string().allow(''),
  newsletter_incentive: Joi.number().integer().max(1).min(0).allow(''),
  addi: Joi.string().max(32768).allow(''),
  customer_number: Joi.string().max(10).allow(''),
  lastchange: Joi.string().max(10).allow(''),
  clubcardnumber: Joi.string().max(30).allow(''),
  salescloud_id: Joi.any().forbidden(),
  commercecloud_id: Joi.string().max(255).allow(''),
  magentocustomer_id: Joi.string().max(255).allow(''),
  magento_email: Joi.string().email().allow(''),
  defacto_email: Joi.string().email().allow(''),
  email_nl: Joi.string().email().allow('')
}

export const schemaUpdate = {
  email: Joi.string().email().allow(''),
  // last: Joi.string().min(1).max(80),
  last: Joi.string().max(40).allow(''),
  first: Joi.string().max(40).allow(''),
  zip: Joi.string().allow(''),
  city: Joi.string().allow(''),
  birth: Joi.date().allow(''),
  title: Joi.string().valid(['Mr.','Ms.','Mrs.','Dr.','Prof.','Frau','Herr']).allow(''),
  status: Joi.string().valid(['a','i','u','h','l','d']).allow(''),
  lang: Joi.string().valid(['de', 'cs', 'sk', 'pl', 'hu', 'ro', 'ch', 'at', 'fr', 'cz']).allow(''),
  datasource: Joi.string().allow(''),
  newsletter_incentive: Joi.number().integer().max(1).min(0).allow(''),
  addi: Joi.string().max(32768).allow(''),
  customer_number: Joi.string().max(10).allow(''),
  lastchange: Joi.string().max(10).allow(''),
  clubcardnumber: Joi.string().max(30).allow(''),
  salescloud_id: Joi.any().forbidden(),
  commercecloud_id: Joi.string().max(255).allow(''),
  magentocustomer_id: Joi.string().max(255).allow(''),
  magento_email: Joi.string().email().allow(''),
  defacto_email: Joi.string().email().allow(''),
  email_nl: Joi.string().email().allow('')
}

export const validDataSource = ['ACO','BUY','OL','KAF','KE']
