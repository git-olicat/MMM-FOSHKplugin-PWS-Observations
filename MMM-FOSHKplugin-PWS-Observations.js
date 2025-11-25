/*  ********************************************
/*  ********************************************
*  Magic Mirror Module for displaying FOSHKplugin PWS Observations
*  Requires FOSHKplugin
*  *********************************************
*/

Module.register("MMM-FOSHKplugin-PWS-Observations", {

  // Default module config.
  defaults: {
    apikey: "", // Your private api key available from Wunderground.com [member settings / API Key]
    pws: "",    // Your Station ID
    units: config.units,
    updateInterval: 1 * 60 * 1000, // every 1 minute
    lang: config.language,
    showWindDirection: true,
    retryDelay: 2500,
    apiBase: "",
    socknot: "GET_WUNDERGROUND",
    sockrcv: "WUNDERGROUND",
    temperature: 1,
    humidity: 1,
    pressure: 1,
    wind: 1,  //1 displays the parameters 0 hides it
    solarRadiation: 0,
    UV: 0,
    rain: 1,    // precipTotal = precipYear
    rainRate: 1,
    dewPoint: 1,
    windChill: 1,
    heatIndex: 1,

    // Oliver 19.11.25
    indoorTemperature: 0,
    indoorHumidity: 0,
    temperature1: 0,       // WH31 channel #1
    Humidity1: 0,
    temperature2: 0,       // WH31 channel #2
    Humidity2: 0,
    temperature3: 0,       // WH31 channel #3
    Humidity3: 0,
    temperature4: 0,       // WH31 channel #4
    Humidity4: 0,
    temperature5: 0,       // WH31 channel #5
    Humidity5: 0,
    temperature6: 0,       // WH31 channel #6
    Humidity6: 0,
    temperature7: 0,       // WH31 channel #7
    Humidity7: 0,
    temperature8: 0,       // WH31 channel #8
    Humidity8: 0,
    soilmoisture: 0,       // WH51 channel #1
    soilmoisture2: 0,      // WH51 channel #2
    soilmoisture3: 0,      // WH51 channel #3
    soilmoisture4: 0,      // WH51 channel #4
    soilmoisture5: 0,      // WH51 channel #5
    soilmoisture6: 0,      // WH51 channel #6
    soilmoisture7: 0,      // WH51 channel #7
    soilmoisture8: 0,      // WH51 channel #8
    soilmoisture9: 0,      // WH51 channel #9
    soilmoisture10: 0,     // WH51 channel #10
    soilmoisture11: 0,     // WH51 channel #11
    soilmoisture12: 0,     // WH51 channel #12
    soilmoisture13: 0,     // WH51 channel #13
    soilmoisture14: 0,     // WH51 channel #14
    soilmoisture15: 0,     // WH51 channel #15
    soilmoisture16: 0,     // WH51 channel #16
    soiltemp: 0,           // WN34 channel #1
    soiltemp2: 0,          // WN34 channel #2
    soiltemp3: 0,          // WN34 channel #3
    soiltemp4: 0,          // WN34 channel #4
    soiltemp5: 0,          // WN34 channel #5
    soiltemp6: 0,          // WN34 channel #6
    soiltemp7: 0,          // WN34 channel #7
    soiltemp8: 0,          // WN34 channel #8
    lightning_day: 0,      // WH57 lightning count
    lightning_distance: 0, // WH57 lightning distance
    lightning_time: 0,     // WH57 last lightning

    rainDay: 0,            // rain daily
    rainWeek: 0,           // rain weekly
    rainMonth: 0,          // rain monthly
    rainYear: 0,           // rain yearly = rain = precipTotal
    rain24: 0,             // rain last 24h
    rainEvent: 0,          // rain this rain event

    piezoDay: 0,           // piezo rain daily
    piezoWeek: 0,          // piezo rain weekly
    piezoMonth: 0,         // piezo rain monthly
    piezoYear: 0,          // piezo rain yearly = rain = precipTotal
    piezo24: 0,            // piezo rain last 24h
    piezoEvent: 0,         // piezo rain this rain event
    isRaining: 0,          // piezo rain state

  },
    
  // Define required translations.
  getTranslations: function() {
    return {
      en: "translations/en.json",
      nl: "translations/nl.json",
      de: "translations/de.json",
      dl: "translations/de.json",
      fr: "translations/fr.json",
      pl: "translations/pl.json"
    };
  },

  getScripts: function() {
    return ["moment.js"];
  },
  
  // Define required Styles.
  getStyles: function() {
    return [
      "weather-icons.css", 
      "weather-icons-wind.css",
      this.file("MMM-FOSHKplugin-PWS-Observations.css")
    ];
  },
  
  // Define start sequence.
  start: function() {
    Log.info("Starting module: " + this.name);

    // Set locale.
    moment.locale(config.language);
    this.loaded = false;
    this.error = false;
    this.errorDescription = "";
    this.getFOSHKplugin();
  },
  
  getFOSHKplugin: function() {
    if ( this.config.debug === 1 ) {
      Log.info("FOSHKplugin: Getting weather.");
    }
    this.sendSocketNotification(this.config.socknot, this.config);
  },
  
  // Override dom generator.
  getDom: function() {
    var wrapper = document.createElement("div");
    var f;
    var forecast;
    var iconCell;
    var icon;
    var maxTempCell;
    var minTempCell;
    var popCell;
    var mmCell;

    if (this.config.apiBase === "") {
      wrapper.innerHTML = this.translate("APIBASE") + this.name + ".";
      wrapper.className = "dimmed light small";
      return wrapper;
    }

    if (this.error) {
      wrapper.innerHTML = "Error: " + this.errorDescription;
      wrapper.className = "dimmed light small";
      return wrapper;
    }

    if (!this.loaded) {
      wrapper.innerHTML = this.translate("LOADING");
      wrapper.className = "dimmed light small";
      return wrapper;
    }

    var spacer = document.createElement("span");
    spacer.innerHTML = "&nbsp;";

    var table_sitrep = document.createElement("table");
    table_sitrep.className = "large1";

    // Versuch ohne fortlaufende Nummer in row

    if (this.config.aqTime == "1"){
      var row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-lightning";
      row_sitrep.appendChild(Icon);

      const aqTime = new Date(this.aqTime * 1000);
      aqTimeHuman = aqTime.toLocaleDateString(config.locale)+ " " + aqTime.toLocaleTimeString(config.locale);
  
      var Value = document.createElement("td");
      Value.className = "poplightningr";
      Value.innerHTML = " " + aqTimeHuman + "";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.temperature == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-thermometer";
      Icon.innerHTML = "out";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.temperature + " " + "&deg;";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.humidity == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-humidity lpad";
      Icon.innerHTML = "out";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = this.Humidity + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.pressure == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-barometer";
      row_sitrep.appendChild(Icon);
      
      var Value = document.createElement("td");
      Value.className ="popr";
      if (this.config.units == "metric") {
        Value.innerHTML = " " + this.pressure + " " + "hPa";
      } else {
        Value.innerHTML = " " + this.pressure + " " + "inHg";
      }
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.wind == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-wind " + this.windDirection;
      row_sitrep.appendChild(Icon);
  
      var Value = document.createElement("td");
      Value.className = "popr";
      if (this.config.units == "metric") {
        Value.innerHTML = " " + this.windSpeed + " " + "kmh";
      } else {
        Value.innerHTML = " " + this.windSpeed + " " + "mph";
      }
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
  
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-strong-wind";
      row_sitrep.appendChild(Icon);
  
      var Value = document.createElement("td");
      Value.className = "popr";
      if (this.config.units == "metric") {
        Value.innerHTML = " " + this.windGust + " " + "kmh";
      } else {
        Value.innerHTML = " " + this.windGust + " " + "mph";
      }
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.solarRadiation == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-hot lpad";
      Icon.innerHTML = "SR";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = this.solarRadiation + " " + "W/m²";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.UV == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-hot";
      Icon.innerHTML = "UV";
      row_sitrep.appendChild(Icon);
    
      var Value = document.createElement("td");
      Value.className ="popr";
      Value.innerHTML = this.UV;
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.rain == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-umbrella";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className ="popr";
      if (this.config.units == "metric") {
        Value.innerHTML = " " + this.rainfall + " " + "mm";
      } else {
        Value.innerHTML = " " + this.rainfall + " " + "\"";
      }
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.rainRate == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-raindrops";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className ="popr";
      if (this.config.units == "metric") {
        Value.innerHTML = "  " + this.rainRate + " " + "mmh";
      } else {
        Value.innerHTML = "  " +this.rainRate + " " + "\"ph";
      }
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.dewPoint == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className ="pop";
      Icon.innerHTML = "DP";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className ="popr";
      Value.innerHTML = " " + this.dewpt + " " + "&deg;";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.windChill == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop";
      Icon.innerHTML = "WC";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className ="popr";
      Value.innerHTML = " " + this.windChill + " " + "&deg;";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.heatIndex == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop";
      Icon.innerHTML = "HI";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.heatIndex + " " + "&deg;";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.indoorTemperature == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-thermometer";
      Icon.innerHTML = "in";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.indoorTemperature + " " + "&deg;";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.indoorHumidity == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-humidity lpad";
      Icon.innerHTML = "in";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = this.indoorHumidity + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    // 
    
    if (this.config.temperature1 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-thermometer";
      Icon.innerHTML = "1";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.temperature1 + " " + "&deg;";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }
    if (this.config.Humidity1 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-humidity lpad";
      Icon.innerHTML = "1";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.Humidity1 + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.temperature2 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-thermometer";
      Icon.innerHTML = "2";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.temperature2 + " " + "&deg;";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }
    if (this.config.Humidity2 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-humidity lpad";
      Icon.innerHTML = "2";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.Humidity2 + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.temperature3 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-thermometer";
      Icon.innerHTML = "3";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.temperature3 + " " + "&deg;";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }
    if (this.config.Humidity3 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-humidity lpad";
      Icon.innerHTML = "3";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.Humidity3 + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.temperature4 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-thermometer";
      Icon.innerHTML = "4";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.temperature4 + " " + "&deg;";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }
    if (this.config.Humidity4 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-humidity lpad";
      Icon.innerHTML = "4";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.Humidity4 + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.temperature5 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-thermometer";
      Icon.innerHTML = "5";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.temperature5 + " " + "&deg;";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }
    if (this.config.Humidity5 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-humidity lpad";
      Icon.innerHTML = "5";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.Humidity5 + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.temperature6 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-thermometer";
      Icon.innerHTML = "6";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.temperature6 + " " + "&deg;";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }
    if (this.config.Humidity6 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-humidity lpad";
      Icon.innerHTML = "6";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.Humidity6 + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.temperature7 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-thermometer";
      Icon.innerHTML = "7";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.temperature7 + " " + "&deg;";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }
    if (this.config.Humidity7 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-humidity lpad";
      Icon.innerHTML = "7";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.Humidity7 + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.temperature8 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-thermometer";
      Icon.innerHTML = "8";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.temperature8 + " " + "&deg;";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }
    if (this.config.Humidity8 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-humidity lpad";
      Icon.innerHTML = "8";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.Humidity8 + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.soilmoisture == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop";
      Icon.innerHTML = "SM1";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = this.soilmoisture + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }
    if (this.config.soilmoisture2 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop";
      Icon.innerHTML = "SM2";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = this.soilmoisture2 + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }
    if (this.config.soilmoisture3 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop";
      Icon.innerHTML = "SM3";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = this.soilmoisture3 + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }
    if (this.config.soilmoisture4 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop";
      Icon.innerHTML = "SM4";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = this.soilmoisture4 + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }
    if (this.config.soilmoisture5 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop";
      Icon.innerHTML = "SM5";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = this.soilmoisture5 + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }
    if (this.config.soilmoisture6 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop";
      Icon.innerHTML = "SM6";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = this.soilmoisture6 + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }
    if (this.config.soilmoisture7 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop";
      Icon.innerHTML = "SM7";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = this.soilmoisture7 + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }
    if (this.config.soilmoisture8 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop";
      Icon.innerHTML = "SM8";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = this.soilmoisture8 + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }
    if (this.config.soilmoisture9 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop";
      Icon.innerHTML = "SM9";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = this.soilmoisture9 + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }
    if (this.config.soilmoisture10 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop";
      Icon.innerHTML = "SM10";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = this.soilmoisture10 + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }
    if (this.config.soilmoisture11 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop";
      Icon.innerHTML = "SM11";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = this.soilmoisture11 + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }
    if (this.config.soilmoisture12 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop";
      Icon.innerHTML = "SM12";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = this.soilmoisture12 + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }
    if (this.config.soilmoisture13 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop";
      Icon.innerHTML = "SM13";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = this.soilmoisture13 + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }
    if (this.config.soilmoisture14 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop";
      Icon.innerHTML = "SM14";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = this.soilmoisture14 + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }
    if (this.config.soilmoisture15 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop";
      Icon.innerHTML = "SM15";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = this.soilmoisture15 + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.soilmoisture16 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop";
      Icon.innerHTML = "SM16";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = this.soilmoisture16 + " " + "%";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.soiltemp == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-thermometer-exterior";
      Icon.innerHTML = "1";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.soiltemp + " " + "&deg;";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.soiltemp2 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-thermometer-exterior";
      Icon.innerHTML = "2";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.soiltemp2 + " " + "&deg;";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.soiltemp3 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-thermometer-exterior";
      Icon.innerHTML = "3";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.soiltemp3 + " " + "&deg;";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.soiltemp4 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-thermometer-exterior";
      Icon.innerHTML = "4";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.soiltemp4 + " " + "&deg;";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.soiltemp5 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-thermometer-exterior";
      Icon.innerHTML = "5";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.soiltemp5 + " " + "&deg;";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.soiltemp6 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-thermometer-exterior";
      Icon.innerHTML = "6";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.soiltemp6 + " " + "&deg;";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.soiltemp7 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-thermometer-exterior";
      Icon.innerHTML = "7";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.soiltemp7 + " " + "&deg;";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.soiltemp8 == "1"){
      row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-thermometer-exterior";
      Icon.innerHTML = "8";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.soiltemp8 + " " + "&deg;";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.lightning_day == "1"){
      var row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-lightning";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      Value.innerHTML = " " + this.lightning_day;
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.lightning_distance == "1"){
      var row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-lightning";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className = "popr";
      if (this.config.units == "metric") {
        Value.innerHTML = " " + this.lightning_distance + "km";
      } else {
        Value.innerHTML = " " + this.lightning_distance + "mi";
      }
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.lightning_time == "1"){
      var row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-lightning";
      row_sitrep.appendChild(Icon);

      const lightningTime = new Date(this.lightning_time * 1000);
      lightningHuman = lightningTime.toLocaleDateString(config.locale)+ " " + lightningTime.toLocaleTimeString(config.locale);
  
      var Value = document.createElement("td");
      Value.className = "poplightningr";
      Value.innerHTML = " " + lightningHuman + "";
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.rainDay == "1"){
      var row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-umbrella";
      Icon.innerHTML = "d";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className ="popr";
      if (this.config.units == "metric") {
        Value.innerHTML = " " + this.rainDay + " " + "mm";
      } else {
        Value.innerHTML = " " + this.rainDay + " " + "\"";
      }
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.rainWeek == "1"){
      var row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-umbrella";
      Icon.innerHTML = "w";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className ="popr";
      if (this.config.units == "metric") {
        Value.innerHTML = " " + this.rainWeek + " " + "mm";
      } else {
        Value.innerHTML = " " + this.rainWeek + " " + "\"";
      }
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.rainMonth == "1"){
      var row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-umbrella";
      Icon.innerHTML = "m";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className ="popr";
      if (this.config.units == "metric") {
        Value.innerHTML = " " + this.rainMonth + " " + "mm";
      } else {
        Value.innerHTML = " " + this.rainMonth + " " + "\"";
      }
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.rainYear == "1"){
      var row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-umbrella";
      Icon.innerHTML = "y";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className ="popr";
      if (this.config.units == "metric") {
        Value.innerHTML = " " + this.rainYear + " " + "mm";
      } else {
        Value.innerHTML = " " + this.rainYear + " " + "\"";
      }
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.rainEvent == "1"){
      var row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-umbrella";
      Icon.innerHTML = "e";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className ="popr";
      if (this.config.units == "metric") {
        Value.innerHTML = " " + this.rainEvent + " " + "mm";
      } else {
        Value.innerHTML = " " + this.rainEvent + " " + "\"";
      }
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    // WS90
    if (this.config.piezoDay == "1"){
      var row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-umbrella";
      Icon.innerHTML = "d";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className ="popr";
      if (this.config.units == "metric") {
        Value.innerHTML = " " + this.piezoDay + " " + "mm";
      } else {
        Value.innerHTML = " " + this.piezoDay + " " + "\"";
      }
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.piezoWeek == "1"){
      var row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-umbrella";
      Icon.innerHTML = "w";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className ="popr";
      if (this.config.units == "metric") {
        Value.innerHTML = " " + this.piezoWeek + " " + "mm";
      } else {
        Value.innerHTML = " " + this.piezoWeek + " " + "\"";
      }
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.piezoMonth == "1"){
      var row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-umbrella";
      Icon.innerHTML = "m";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className ="popr";
      if (this.config.units == "metric") {
        Value.innerHTML = " " + this.piezoMonth + " " + "mm";
      } else {
        Value.innerHTML = " " + this.piezoMonth + " " + "\"";
      }
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.piezoYear == "1"){
      var row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-umbrella";
      Icon.innerHTML = "y";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className ="popr";
      if (this.config.units == "metric") {
        Value.innerHTML = " " + this.piezoYear + " " + "mm";
      } else {
        Value.innerHTML = " " + this.piezoYear + " " + "\"";
      }
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.piezoEvent == "1"){
      var row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-umbrella";
      Icon.innerHTML = "e";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className ="popr";
      if (this.config.units == "metric") {
        Value.innerHTML = " " + this.piezoEvent + " " + "mm";
      } else {
        Value.innerHTML = " " + this.piezoEvent + " " + "\"";
      }
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }

    if (this.config.isRaining == "1"){
      var row_sitrep = document.createElement("tr");
      var Icon = document.createElement("td");
      Icon.className = "pop wi wi-umbrella";
      Icon.innerHTML = "is";
      row_sitrep.appendChild(Icon);

      var Value = document.createElement("td");
      Value.className ="popr";
      
      if (this.isRaining === "0") {
        if (config.language == "de") { Value.innerHTML = "ja"; } else { Value.innerHTML = "yes"; }
      } else {
      }
        if (config.language == "de") { Value.innerHTML = "nein"; } else { Value.innerHTML = "no"; }
      row_sitrep.appendChild(Value);
      table_sitrep.appendChild(row_sitrep);
    }







    /*
    // Array Test
    const items = [
      ["rainDay","pop wi wi-umbrella","d","mm"],
      ["rainWeek","pop wi wi-umbrella","w","mm"],
      ["rainMonth","pop wi wi-umbrella","m","mm"],
      ["rainYear","pop wi wi-umbrella","y","mm"],
      ["rain24","pop wi wi-umbrella","24","mm"],
      ["rainEvent","pop wi wi-umbrella","e","mm"],
    ];

    for (let i = 0; i < items.length; i++) {
      Log.info('***********************************************************************************************************************');
      //console.log(items[i][0]+" = "+this.eval(items[i][0]));
      Log.info('***********************************************************************************************************************');
      if (this.config.eval(items[i][0]) == "1"){
        var row_sitrep = document.createElement("tr");
        var Icon = document.createElement("td");
        Icon.className = items[i][1];
        Icon.innerHTML = items[i][2];
        row_sitrep.appendChild(Icon);

        var value = document.createElement("td");
        value.className ="popr";
        if (this.config.units == "metric") {
          value.innerHTML = " " + this.eval(items[i][0])  + "mm";
        } else {
          value.innerHTML = " " + this.eval(items[i][0]) + "\"";
        }
        row_sitrep.appendChild(value);
        table_sitrep.appendChild(row_sitrep);
      }
    }
    */






    console.log("table" + table_sitrep);
    wrapper.appendChild(table_sitrep);
    console.log(wrapper);
    return wrapper;
  },

  /* processWeather(data)
   * Uses the received data to set the various values.
   *
   * argument data object - Weather information received form openweather.org.
  */

  processWeather: function(data) {
  
    this.aqTime = data.observations[0].aqTime;
  
    this.windDirection = this.deg2Cardinal(data.observations[0].winddir);
    this.Humidity = data.observations[0].humidity;
    this.UV = data.observations[0].UV;

    this.temperature = data.observations[0][this.config.units].temp;
    console.log(this.config.units + " " + this.temperature)

    this.heatIndex = data.observations[0][this.config.units].heatIndex;
    this.dewpt = data.observations[0][this.config.units].dewpt;
    this.windChill =data.observations[0][this.config.units].windChill;
    this.windSpeed = data.observations[0][this.config.units].windSpeed;
    this.windGust = data.observations[0][this.config.units].windGust;
    this.pressure = data.observations[0][this.config.units].pressure;
    this.rainRate = data.observations[0][this.config.units].precipRate;
    this.rainfall = data.observations[0][this.config.units].precipTotal;

    // Oliver, 19.11.25
    this.solarRadiation = data.observations[0].solarRadiation;

    this.indoorHumidity = data.observations[0].indoorHumidity;
    this.indoorTemperature = data.observations[0][this.config.units].indoorTemp;

    this.temperature1 = data.observations[0][this.config.units].temp1f;
    this.Humidity1 = data.observations[0].humidity1;
    this.temperature2 = data.observations[0][this.config.units].temp2f;
    this.Humidity2 = data.observations[0].humidity2;
    this.temperature3 = data.observations[0][this.config.units].temp3f;
    this.Humidity3 = data.observations[0].humidity3;
    this.temperature4 = data.observations[0][this.config.units].temp4f;
    this.Humidity4 = data.observations[0].humidity4;
    this.temperature5 = data.observations[0][this.config.units].temp5f;
    this.Humidity5 = data.observations[0].humidity5;
    this.temperature6 = data.observations[0][this.config.units].temp6f;
    this.Humidity6 = data.observations[0].humidity6;
    this.temperature7 = data.observations[0][this.config.units].temp7f;
    this.Humidity7 = data.observations[0].humidity7;
    this.temperature8 = data.observations[0][this.config.units].temp8f;
    this.Humidity8 = data.observations[0].humidity8;

    this.soilmoisture = data.observations[0].soilmoisture;
    this.soilmoisture2 = data.observations[0].soilmoisture2;
    this.soilmoisture3 = data.observations[0].soilmoisture3;
    this.soilmoisture4 = data.observations[0].soilmoisture4;
    this.soilmoisture5 = data.observations[0].soilmoisture5;
    this.soilmoisture6 = data.observations[0].soilmoisture6;
    this.soilmoisture7 = data.observations[0].soilmoisture7;
    this.soilmoisture8 = data.observations[0].soilmoisture8;
    this.soilmoisture9 = data.observations[0].soilmoisture9;
    this.soilmoisture10 = data.observations[0].soilmoisture10;
    this.soilmoisture11 = data.observations[0].soilmoisture11;
    this.soilmoisture12 = data.observations[0].soilmoisture12;
    this.soilmoisture13 = data.observations[0].soilmoisture13;
    this.soilmoisture14 = data.observations[0].soilmoisture14;
    this.soilmoisture15 = data.observations[0].soilmoisture15;
    this.soilmoisture16 = data.observations[0].soilmoisture16;

    this.soiltemp = data.observations[0][this.config.units].soiltempf;
    this.soiltemp2 = data.observations[0][this.config.units].soiltemp2f;
    this.soiltemp3 = data.observations[0][this.config.units].soiltemp3f;
    this.soiltemp4 = data.observations[0][this.config.units].soiltemp4f;
    this.soiltemp5 = data.observations[0][this.config.units].soiltemp5f;
    this.soiltemp6 = data.observations[0][this.config.units].soiltemp6f;
    this.soiltemp7 = data.observations[0][this.config.units].soiltemp7f;
    this.soiltemp8 = data.observations[0][this.config.units].soiltemp8f;

    this.lightning_time = data.observations[0].lightningTime;
    this.lightning_day = data.observations[0].lightningCount;
    this.lightning_distance = data.observations[0][this.config.units].lightningDistance;

    this.rainDay = data.observations[0][this.config.units].precipDay;
    this.rainWeek = data.observations[0][this.config.units].precipWeek;
    this.rainMonth = data.observations[0][this.config.units].precipMonth;
    this.rain24 = data.observations[0][this.config.units].precip24;
    this.rainYear = data.observations[0][this.config.units].precipYear;
    this.rainEvent = data.observations[0][this.config.units].precipEvent;

    this.piezoDay = data.observations[0][this.config.units].piezoDay;
    this.piezoWeek = data.observations[0][this.config.units].piezoWeek;
    this.piezoMonth = data.observations[0][this.config.units].piezoMonth;
    this.piezoYear = data.observations[0][this.config.units].piezoYear;
    this.piezo24 = data.observations[0][this.config.units].piezo24;
    this.piezoEvent = data.observations[0][this.config.units].piezoEvent;
    this.isRaining = data.observations[0].isRaining;

    this.realtimeFrequency = data.observations[0].realtimeFrequency;

    this.loaded = true;
    this.updateDom(this.config.animationSpeed);

  },
  
  /* deg2Cardinal(degrees)
   * Converts wind direction in degrees to directional description
   *
   * argument wind direction in degrees - deg
   *
   * return text
  */

  deg2Cardinal: function(deg) {
    if (deg > 11.25 && deg <= 33.75) {
      return "wi-from-nne";
    } else if (deg > 33.75 && deg <= 56.25) {
      return "wi-from-ne";
    } else if (deg > 56.25 && deg <= 78.75) {
      return "wi-from-ene";
    } else if (deg > 78.75 && deg <= 101.25) {
      return "wi-from-e";
    } else if (deg > 101.25 && deg <= 123.75) {
      return "wi-from-ese";
    } else if (deg > 123.75 && deg <= 146.25) {
      return "wi-from-se";
    } else if (deg > 146.25 && deg <= 168.75) {
      return "wi-from-sse";
    } else if (deg > 168.75 && deg <= 191.25) {
      return "wi-from-s";
    } else if (deg > 191.25 && deg <= 213.75) {
      return "wi-from-ssw";
    } else if (deg > 213.75 && deg <= 236.25) {
      return "wi-from-sw";
    } else if (deg > 236.25 && deg <= 258.75) {
      return "wi-from-wsw";
    } else if (deg > 258.75 && deg <= 281.25) {
      return "wi-from-w";
    } else if (deg > 281.25 && deg <= 303.75) {
      return "wi-from-wnw";
    } else if (deg > 303.75 && deg <= 326.25) {
      return "wi-from-nw";
    } else if (deg > 326.25 && deg <= 348.75) {
      return "wi-from-nnw";
    } else {
      return "wi-from-n";
    }
  },
  
  /* function(temperature)
  *  Rounds a temperature to 1 decimal.
  *
  *  argument temperature number - Temperature.
  *
  *  return number - Rounded Temperature.
  */
  roundValue: function(temperature) {
    return parseFloat(temperature).toFixed(this.config.roundTmpDecs);
  },
  
  /* function (socketNotificationReceived)
  *
  */
  socketNotificationReceived: function(notification, payload) {
    var self = this;

    if ( this.config.debug === 1 ) {
      Log.info('FOSHKplugin received ' + notification);
    }
    if (notification === this.config.sockrcv) {
      if ( this.config.debug === 1 ) {
        Log.info('received ' + this.config.sockrcv);
        Log.info(payload);
      }
      self.processWeather(JSON.parse(payload));
    }
  }
});
