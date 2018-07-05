import _ from 'underscore'
export default async function(axmi, req, res, next) {

  //const reqJson = await xmlparse.parseMagentoXml(req.body)
  console.dir('Auto Populate middleware In');
  console.dir(axmi);
  if(!axmi.data) next(axmi);

  if(axmi.data.personemail){
    //fill Sendout_Language__c to take the value from <lang>
    axmi.data.email_nl__pc = axmi.data.personemail
  }

  console.log(axmi.data.magento_language__pc);
  if(axmi.data.magento_language__pc){
    //fill Sendout_Language__c to take the value from <lang>
    axmi.data.sendout_language__c = axmi.data.magento_language__pc
    axmi.data.sendout_country__c = axmi.data.magento_language__pc.toUpperCase()
  }

  if(axmi.data.email_opt_in_status__pc === 'h'){
    //when the status is set to h - populate email_request_timestamp__pc with System.now()
    axmi.data.email_request_timestamp__pc = new Date().toISOString()
  }else if(axmi.data.email_opt_in_status__pc === 'a'){
    //when the status is set to a - populate email_confirmation_timestamp__pc with System.now()
    axmi.data.email_confirmation_timestamp__pc = new Date().toISOString()
  }else if(axmi.data.email_opt_in_status__pc === 'u'){
    //when the status is set to u - populate email_revoke_timestamp__pc with System.now()
    axmi.data.email_revoke_timestamp__pc = new Date().toISOString()
  }

  next(axmi);
}
