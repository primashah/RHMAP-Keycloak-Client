window.keycloakAuth = null;
document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('resume', onAppResume, false);




function onAppResume() {
  
  //Checks whether user is already logged in .
  //Note :On Android , closing chrome custom tabs fires resume event and hence  results in ifinite loop
  if (cordova.platformId === "ios") {
    keycloakAuth.init({
      onLoad: 'check-sso'
    }).success(function () {}).error(function (e) {});

  }
}

function onDeviceReady() {
 

  window.handleOpenURL = function (url) {
    SafariViewController.hide();
    keycloakAuth.handleCustomURICallback(url);
  };
  //Initialize keycloak
  keycloakAuth = new Keycloak({
    "realm": "<<Keycloak Realm name>>",
    "redirect-ui": "<<Redirect uri set through Admin Console for a Mobile Client>>", //eg. : "ssoapp1://callback"
    "auth-server-url": "https://<<Keycloak host >>/auth",
    "url": "https://<<Keycloak host >>/auth",
    "ssl-required": "none", //testing purpose
    "resource": "<<Client Id set througgh Admin Console for a Mobile Client>>",
    "credentials": {
      "secret": "<<Secret for a Mobile Client>>"
    },
    "clientId": "<<Client Id set througgh Admin Console for a Mobile Client>>",
  });


  keycloakAuth.onAuthLogout = function () {
    document.getElementById("spinner").style.display = "none"
    // document.getElementById("cloudAPI").style.display="none";
    document.getElementById("logout").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("description").innerHTML = "You are logged out. Please login again."
  }
  keycloakAuth.onAuthSuccess = function () {
    //document.getElementById("cloudAPI").style.display="block";
    document.getElementById("spinner").style.display = "none"
    document.getElementById("logout").style.display = "block";
    document.getElementById("userProfile").style.display = "block";

    document.getElementById("login").style.display = "none";
    document.getElementById("description").innerHTML = "User is logged in succesfully"
  };
  keycloakAuth.onAuthError = function (errorData) {
    //document.getElementById("cloudAPI").style.display="none";
    document.getElementById("spinner").style.display = "none"
    document.getElementById("description").innerHTML = "You are not logged in."
    document.getElementById("logout").style.display = "none";
    document.getElementById("userProfile").style.display = "none";
    document.getElementById("login").style.display = "block";
  };

  keycloakAuth.init({
    onLoad: 'login-required'
  }).success(function () {}).error(function (e) {});




}