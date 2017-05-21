(function(){
  const WIFI = require('./lib/wifi.js');
  const wifi = {};

  //--------------------------------------

  WIFI.init({
    debug: process.env.NON_DEBUG || true,
    iface: process.env.NON_IFACE || 'wlan1',
    connectionTimeout: 10000
  });

  //--------------------------------------

  wifi.scan = function() {
    return new Promise(function(resolve, reject){
      WIFI.scanForWiFi( function(err, resp) {
        err ? reject(err) : resolve(resp);
      });
    });
  }
  wifi.connect = function(ap) {
    return new Promise(function(resolve, reject){
      WIFI.connectToAP(ap, function(err, resp) {
        err ? reject(err) : resolve(resp);
      });
    })
  }
  wifi.status = function() {
    return new Promise(function(resolve, reject){
      var state = WIFI.getIfaceState();
      resolve(state);
    })
  }
  wifi.reset = function(){
    return new Promise(function(resolve, reject){
      WIFI.resetWiFi(function(err, resp) {
        err ? reject(err) : resolve(resp);
      });
    })
  }

  module.exports = wifi;

}).call(this);
