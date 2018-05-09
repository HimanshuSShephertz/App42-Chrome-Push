'use strict';
var API_KEY = "12daacee60bd1f04e46a71b852f601bdfaa49fe8047a8322e3a3daf4d9b244f7";
var SECERT_KEY = "6d401bd0324f31c9d45cdc25e70f38279940da51fff13cb8f3c7fb422db6600d";
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
		console.log('Service Worker registration failed: ', err);
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