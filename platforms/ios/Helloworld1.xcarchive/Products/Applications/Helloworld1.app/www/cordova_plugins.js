cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-customurlscheme.LaunchMyApp",
        "file": "plugins/cordova-plugin-customurlscheme/www/ios/LaunchMyApp.js",
        "pluginId": "cordova-plugin-customurlscheme",
        "clobbers": [
            "window.plugins.launchmyapp"
        ]
    },
    {
        "id": "cordova-plugin-safariviewcontroller.SafariViewController",
        "file": "plugins/cordova-plugin-safariviewcontroller/www/SafariViewController.js",
        "pluginId": "cordova-plugin-safariviewcontroller",
        "clobbers": [
            "SafariViewController"
        ]
    },
    {
        "id": "cordova-plugin-urlhandler.LaunchMyApp",
        "file": "plugins/cordova-plugin-urlhandler/www/ios/LaunchMyApp.js",
        "pluginId": "cordova-plugin-urlhandler",
        "clobbers": [
            "window.plugins.launchmyapp"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-customurlscheme": "4.3.0",
    "cordova-plugin-safariviewcontroller": "1.4.7",
    "cordova-plugin-urlhandler": "0.7.0",
    "cordova-plugin-whitelist": "1.3.3-dev"
};
// BOTTOM OF METADATA
});