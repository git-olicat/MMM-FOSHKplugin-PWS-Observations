/* Magic Mirror
 * Module: MMM-FOSHKplugin-PWS-Observations
 *
 * originally by SAABman, 2021
 * Phantasoft, 2025
 * MIT Licensed.
 */
 
var NodeHelper = require('node_helper');
var request = require('request');
var moment = require('moment');
const exec = require('child_process').exec; 

module.exports = NodeHelper.create({
  start: function () {
    console.log('MMM-FOSHKplugin-PWS-Observations helper started ...');
    this.fetcherRunning = false;
    this.wunderPayload = "";
  },
  
  //Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    console.log(notification);
    var self = this;
    
    if(notification === "GET_FOSHKPLUGIN") {
      this.config = payload;
      if ( this.config.debug === 1 ) {
        console.log('Lets get FOSHKplugin requested!!!!!');
        console.log(this.config);
      }
      if (!this.fetcherRunning) {
        this.fetchFOSHKplugin();
      }
    }
  },
     
  fetchFOSHKplugin: function() {
    var self = this;
    this.fetcherRunning = true; 
    
    var params = "current?stationId="; 
    var wulang = this.config.lang.toUpperCase();
    if (wulang == "DE") {
      wulang = "DL";
    }

    params += this.config.pws;
    params += "&format=json&units=";
    
    if (this.config.units == "metric") {
      params +="m";
    } else {
      params +="e";
    }
    
    params += "&apiKey=";
    params += this.config.apikey;
    
    var Wurl = this.config.apiBase + params;
    console.log(Wurl);
    if ( this.config.debug === 1 ) {
      console.log(moment().format() + " 4 " + this.name  + ": " + Wurl);
    }
    
    // Requests Current weather    
    request({
      url: Wurl,
      method: 'GET'
    },
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        this.wunderPayload = body;
        if ( this.config.debug === 1 ) { console.log(moment().format() + " 5 " + self.name + ": " + body); }
        self.sendSocketNotification('FOSHKPLUGIN',body);
      } else {
        console.log(moment().format() + " 6 " + self.name + ": " + error);
      }

      setTimeout(function() {
        self.fetchFOSHKplugin();
      }, 
      self.config.updateInterval

      );
    },
    );
  }

}); 
