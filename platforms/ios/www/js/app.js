window.keycloakAuth = null;
document.addEventListener('deviceready', onDeviceReady, false);

document.addEventListener('resume', onAppResume, false);

function onAppResume() {
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
    "realm": "SSO_POC",
    "redirect-ui": "ssoapp1://callback",
    "auth-server-url": "https://keycloak-osdprim.rhcloud.com/auth",
    "url": "https://keycloak-osdprim.rhcloud.com/auth",
    "ssl-required": "none",
    "resource": "app1",
    "credentials": {
      "secret": "c226b55e-1036-4a6e-9b99-da7cd3165709"
    },
    "clientId": "app1"
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