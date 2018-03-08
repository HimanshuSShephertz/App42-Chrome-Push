'use strict';
var API_KEY = "API_KEY"
var SECERT_KEY = "SECRET_KEY"
if ('serviceWorker' in navigator) {
  var type = jQuery.browser.name;
  var jsAddress = "chrome-worker.js"
  if(type== "Firefox"){
	  jsAddress = "firefox-worker.js";
  }
  navigator.serviceWorker.register(jsAddress).then(function(reg) {
     reg.pushManager.getSubscription().then(function(sub) {	 
	var regID ;
      if (sub === null) {
		reg.pushManager.subscribe({userVisibleOnly: true}).then(function(sub) {
			regID = sub.endpoint
				if(type=="Chrome"){
					var idD = regID.substring(regID.indexOf("d/")+1);
					regID =  idD.substring(idD.indexOf("/")+1);
				}else if(type=="Firefox"){
					var idD = regID.substring(regID.indexOf("v1/")+ 1);
					regID = sub.endpoint.replace(/ /g,'')
				}
				registerDeviceWithApp42(regID,type.toUpperCase())	
		  }).catch(function(e) {
			// Handle Exception here
		  });
      } else {
       regID = sub.endpoint
		if(type=="Chrome"){
			var idD = regID.substring(regID.indexOf("d/")+1);
			regID =  idD.substring(idD.indexOf("/")+1);
		}else if(type=="Firefox"){
			var idD = regID.substring(regID.indexOf("v1/")+ 1);
			regID = sub.endpoint.replace(/ /g,'')
		}
		registerDeviceWithApp42(regID,type.toUpperCase())	
      }
    });
  })
   .catch(function(err) {
    console.log('Service Worker registration failed: ');
  });
}
function registerDeviceWithApp42(token,type ){
	var pushNotificationService  = new App42Push();
	App42.initialize(API_KEY, SECERT_KEY);
	pushNotificationService.storeDeviceToken(localStorage.getItem("_App42_DeviceId"),token,type,{  
		success: function(object) 
		{  
			window.close();
		},
		error: function(error) {  
			window.close();
		}  
	});  
}