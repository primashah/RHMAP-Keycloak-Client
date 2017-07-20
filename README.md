# Helloworld app
   
Technologies: Javascript, Cordova, RHMAP, KeyCloak   
Summary: 
A demonstration on how Cordova Apps on RHMAP can integrate easily with Keycloak


A demo app on how to secure applications created in RHMAP using Keycloak 
and how to enable Single Sign on across multiple Cordova based mobile apps


Prerequisites: fh-js-sdk : 2.14.+, Cordova 5.0+ , Access to Keyclaok Admin console, RHMAP instance

## What is it?
This application shows how you can implement SSO by using mobile browser components that provides access to shared cookeis , allowing applications to re-use authentication sessions.

The application uses a modified version of Keycloak Javascript Adapter. The adapter is modified to interact with mobile browser component instead of inappbrowser. 




This application also shows how you can use cloud call with the RHMAP platform and Keycloak token, it should be used in combination with the [HelloWorld cloud app](https://github.com/feedhenry-templates/helloworld-cloud). Refer to `www/fhconfig.json` for configuration.

If you do not have access to a RHMAP instance, you can sign up for a free instance at [https://openshift.feedhenry.com/](https://openshift.feedhenry.com/).


#  Register App with custom url scheme
Register app to listen on custom url scheme by installing [cordova-plugin-urlhandler](https://github.com/EddyVerbruggen/cordova-plugin-safariviewcontroller). 
The plugin enables to pass data from a Keycloak web page  back to Cordova  app. 
The scheme should match with what is set in the keycloak’s “redirect_uri” parameter.

```
eg.: cordova plugin add cordova-plugin-urlhandler --variable URL_SCHEME=ssoapp1

```

# Fallback to native browser


Currently the app has a fallback Android/IOS versions where SafariViewController or Chrome Custom Tabs are not available (see the snippet below from file keycloak.js) , app opens the keycloak URL in the system browser.

```javascript
SafariViewController.isAvailable(function (available) {

                            if (available) {
                                SafariViewController.show({
                                        url: loginUrl,
                                        hidden: hideBrowser, // default false
                                        animated: true, // default true, note that 'hide' will reuse this preference (the 'Done' button will always animate though)
                                        transition: 'slide', // unless animated is false you can choose from: curl, flip, fade, slide (default)
                                        enterReaderModeIfAvailable: true, // default false
                                        barColor: "#0000ff", // default is white (iOS 10 only)
                                        tintColor: "#ffffff" // default is ios blue
                                    },
                                    function (result, b) {
                                        if (result.event === 'opened') {
                                              console.log('opened' + JSON.stringify(result));
                                        } else if (result.event === 'loaded') {
                                              console.log('loaded' + JSON.stringify(result));
                                        } else if (result.event === 'closed') {
                                              console.log('closed' + JSON.stringify(result));
                                        }
                                    },
                                    function (msg) {
                                        console.log("KO: " + JSON.stringify(msg));
                                    })
                            } else {
                                // potentially powered by InAppBrowser 
                                var o = 'location=no';
                                if (options && options.prompt == 'none') {
                                    o += ',hidden=yes';
                                }
                                var ref = window.open(loginUrl, '_system', o);
                            }
                        })
```

Note: Apple has announced a change in the behavior of Safari View Controller with iOS 11 that stored data (cookies, local storage, etc.) will no longer be shared between instances of Safari View Controller. Above code can be modified to include furter check for IOS versions and hence fallback to system browsers


 

# KeyCloak Setup

Keycloak has the concept of a realm in which the clients needs to be defined. Clients means an application that will be secured by Keycloak. 

Through keycloak Admin Console, create one Realm with at least two clients

Cloud Client: A client representing RHMAP cloud app.
Mobile Client : A client representing Cordova Mobile app. One client for each mobile app.

## 1. Realm : 
Create a new realm by setting a name.
### Keycloak Configurations:
Name : SSO_POC

## 2. Cloud Client
The client here is the RHMAP Cloud app. It will be acting as a resource server whose resources/endpoints are protected by a bearer token.

### Keycloak Configurations:
 * Client Protocol : openid-connect
 * Access Type: bearer only ( only requests bearing valid access token can be authorized)
 * Cleint ID : RHMAP Cloud App ( an identifier to be used where we want to use this client)


## 3. Mobile Client
The mobile clients are the mobile apps responsible for obtaining tokens from keycloak and use these tokens to access the endpoints of the Cloud app.

### Keycloak Configurations:

* Client ID: app1
* Client Protocol: openid-connect
* Access Type: confidential 
* Standard Flow: Enabled
* Redirect URI:  ssoapp1://callback  
  This uri is use to redirect user back to mobile app. It should be a valid custom
  scheme which instructs the mobile OS to launch application registered with that url.
* Base URL: ssoapp1://callback
  Default url when keycloak needs to redirect back to application
 
Repeat above Mobile Client configuration for each app that needs SSO capability. Each app should have a unique clientid, redirect_uri and base url.
 



## Build instructions
 * npm install
 * Edit `www/fhconfig.json` to include the relevant information from RHMAP. 
 * Edit Keycloak config in app.js to include information from Keycloak Admin Console. 
```
  keycloakAuth = new Keycloak({
    "realm": <<Realm Name>>,
    "redirect-ui": <<Redirect_URI>> , // eg: "ssoapp1://callback",
    "auth-server-url": "https://<<keycloak host>>/auth",
    "url": "https://<<Keycloak host>>/auth",
    "ssl-required": "none",//for testing purpose
    "resource": <<Client Id>> , 
    "credentials": {
      "secret": <<Client Secret>>
    },
    "clientId":<<Client Id>
  });
```
 * Build and run on device
```
cordova platforms add android
cordova  build android
cordova run android

cordova platforms add ios
cordova  build ios
Open Xcode to deploy app.


```











