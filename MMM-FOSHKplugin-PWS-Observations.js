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
    wind: 1,  //1 displays the parameters 0 hides it
    humidity: 1,
    UV: 0,
    rain: 1,
    rainRate: 1,
    pressure: 1,
    dewPoint: 1,
    windChill: 1,
    heatIndex: 1,
    temperature: 1,
    
    // Oliver 19.11.25
    solarRadiation: 0,
    indoorHumidity: 0,
    indoorTemperature: 0,
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
    lightning_time: 0,     // WH57 last lightning
    lightning_day: 0,      // WH57 lightning count
    lightning_distance: 0, // WH57 lightning distance
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
    this.getWunder();
  },
      
  getWunder: function() {
    if ( this.config.debug === 1 ) {
      Log.info("FOSHKplugin: Getting weather.");
    }
    //this.sendSocketNotification("GET_WUNDERGROUND", this.config);
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
    
    var row_sitrep = document.createElement("tr");
    //row_sitrep.className = "pop";
    console.log(row_sitrep);
  
    var row1_sitrep = document.createElement("tr");
    //row1_sitrep.className = "pop";
    console.log(row_sitrep);
    
    var row2_sitrep = document.createElement("tr");
    //row2_sitrep.className = "pop";
  
    var row3_sitrep = document.createElement("tr");
    //row3_sitrep.className = "pop";
    
    var row4_sitrep = document.createElement("tr");
    //row4_sitrep.className = "pop";
    
    var row5_sitrep = document.createElement("tr");
    //row5_sitrep.className = "pop";
  
    var row6_sitrep = document.createElement("tr");
    //row6_sitrep.className = "pop";

    var row7_sitrep = document.createElement("tr");
    //row7_sitrep.className = "pop";
  
    var row8_sitrep = document.createElement("tr");
    //row8_sitrep.className = "pop";
  
    var row9_sitrep = document.createElement("tr");
    //row9_sitrep.className = "pop";
  
    var row10_sitrep = document.createElement("tr");
    //row10_sitrep.className = "pop";

    var row11_sitrep = document.createElement("tr");
    var row12_sitrep = document.createElement("tr");
    var row13_sitrep = document.createElement("tr");
    var row14_sitrep = document.createElement("tr");
    var row15_sitrep = document.createElement("tr");
    var row16_sitrep = document.createElement("tr");
    var row17_sitrep = document.createElement("tr");
    var row18_sitrep = document.createElement("tr");
    var row19_sitrep = document.createElement("tr");
    var row20_sitrep = document.createElement("tr");
  
    if (this.config.wind == "1"){
      var windDirectionIcon = document.createElement("td");
      windDirectionIcon.className = "pop wi wi-wind " + this.windDirection;
      row_sitrep.appendChild(windDirectionIcon);
  
      var wind = document.createElement("td");
      console.log(wind);
      wind.className = "popr";
      if (this.config.units == "metric") {
        wind.innerHTML = " " + this.windSpeed + "Kmh";
      } else {
        wind.innerHTML = " " + this.windSpeed + "mph";
      }
      row_sitrep.appendChild(wind);
      table_sitrep.appendChild(row_sitrep);
      
      var windGustIcon = document.createElement("td");
      windGustIcon.className = "pop wi wi-strong-wind";// + this.windGust;
      row1_sitrep.appendChild(windGustIcon);
      
      var windGust = document.createElement("td");
      windGust.className = "popr";
      if (this.config.units == "metric") {
        windGust.innerHTML = " " + this.windGust + "Kmh";
      } else {
        windGust.innerHTML = " " + this.windGust + "mph";
      }
      row1_sitrep.appendChild(windGust);
      table_sitrep.appendChild(row1_sitrep);
    }
  
    if (this.config.humidity == "1"){ 
      var HumidityIcon = document.createElement("td");
      HumidityIcon.className = "pop wi wi-humidity lpad";
      row2_sitrep.appendChild(HumidityIcon);

      var HumidityTxt = document.createElement("td");
      HumidityTxt.className = "popr";
      HumidityTxt.innerHTML = this.Humidity + "%";
      row2_sitrep.appendChild(HumidityTxt);
      table_sitrep.appendChild(row2_sitrep);
    }
        
    if (this.config.UV == "1"){
      var UVIcon = document.createElement("td");
      UVIcon.className = "pop wi wi-hot";
      row3_sitrep.appendChild(UVIcon);
        
      var UVTxt = document.createElement("td");
      UVTxt.className ="popr";
      UVTxt.innerHTML = this.UV;
      row3_sitrep.appendChild(UVTxt);
      table_sitrep.appendChild(row3_sitrep);
    }
  
    if (this.config.rain == "1"){
      var RainIcon = document.createElement("td");
      RainIcon.className = "pop wi wi-umbrella";
      row4_sitrep.appendChild(RainIcon);

      var rainfall = document.createElement("td");
      rainfall.className ="popr";
      if (this.config.units == "metric") {
        rainfall.innerHTML = " " + this.rainfall + "mm";
      } else {
        rainfall.innerHTML = " " + this.rainfall + "\"";
      }
      row4_sitrep.appendChild(rainfall);
      table_sitrep.appendChild(row4_sitrep);
    }
        
    if (this.config.rainRate == "1"){
      var rainRateIcon = document.createElement("td");
      rainRateIcon.className = "pop wi wi-raindrops";
      row5_sitrep.appendChild(rainRateIcon);

      var rainRate = document.createElement("td");
      rainRate.className ="popr";
      if (this.config.units == "metric") {
        rainRate.innerHTML = "  " + this.rainRate + "mmh";
      } else {
        rainRate.innerHTML = "  " +this.rainRate + "\"ph"; //this.rainRate
      }
      row5_sitrep.appendChild(rainRate);
      table_sitrep.appendChild(row5_sitrep);
    }
    
    if (this.config.pressure == "1"){
      var pressureIcon = document.createElement("td");
      pressureIcon.className = "pop wi wi-barometer";
      row6_sitrep.appendChild(pressureIcon);

      var pressure = document.createElement("td");
      pressure.className ="popr";
      pressure.innerHTML = this.pressure;
      row6_sitrep.appendChild(pressure);
      table_sitrep.appendChild(row6_sitrep);
    }
        
    if (this.config.dewPoint == "1"){
      var dewPointIcon = document.createElement("td");
      dewPointIcon.className ="pop";
      dewPointIcon.innerHTML = "DP";
      row7_sitrep.appendChild(dewPointIcon);
    
      var dewPoint = document.createElement("td");
      dewPoint.className ="popr";
      dewPoint.innerHTML = " " + this.dewpt + "&deg;";
      row7_sitrep.appendChild(dewPoint);
      table_sitrep.appendChild(row7_sitrep);
    }
    
    if (this.config.windChill == "1"){
      var windChillIcon = document.createElement("td");
      windChillIcon.className = "pop";
      windChillIcon.innerHTML = "WC";
      row8_sitrep.appendChild(windChillIcon);
    
      var windChill = document.createElement("td");
      windChill.className ="popr";
      windChill.innerHTML = " " + this.windChill + "&deg;";
      row8_sitrep.appendChild(windChill);
      table_sitrep.appendChild(row8_sitrep);
    }
    
    if (this.config.heatIndex == "1"){
      var heatIndexIcon = document.createElement("td");
      heatIndexIcon.className = "pop";
      heatIndexIcon.innerHTML = "HI";
      row9_sitrep.appendChild(heatIndexIcon);
    
      var heatIndex = document.createElement("td");
      heatIndex.className = "popr";
      heatIndex.innerHTML = " " + this.heatIndex + "&deg;";
      row9_sitrep.appendChild(heatIndex);
      table_sitrep.appendChild(row9_sitrep);
    }

    if (this.config.temperature == "1"){
      var temperatureIcon = document.createElement("td");
      temperatureIcon.className = "pop wi wi-thermometer";
      row10_sitrep.appendChild(temperatureIcon);
    
      var temperature = document.createElement("td");
      temperature.className = "popr";
      temperature.innerHTML = " " + this.temperature + "&deg;";
      row10_sitrep.appendChild(temperature);
      table_sitrep.appendChild(row10_sitrep);
    }
    
    // Oliver, 22.11.25 - what about rows?
    if (this.config.solarRadiation == "1"){ 
      var solarRadiationIcon = document.createElement("td");
      solarRadiationIcon.className = "pop wi wi-hot lpad";
      row11_sitrep.appendChild(solarRadiationIcon);

      var solarRadiationTxt = document.createElement("td");
      solarRadiationTxt.className = "popr";
      solarRadiationTxt.innerHTML = this.solarRadiation + "W/m²";
      row11_sitrep.appendChild(solarRadiationTxt);
      table_sitrep.appendChild(row11_sitrep);
    }

    if (this.config.indoorHumidity == "1"){ 
      var indoorHumidityIcon = document.createElement("td");
      indoorHumidityIcon.className = "pop wi wi-humidity lpad";
      row12_sitrep.appendChild(indoorHumidityIcon);

      var indoorHumidityTxt = document.createElement("td");
      indoorHumidityTxt.className = "popr";
      indoorHumidityTxt.innerHTML = this.indoorHumidity + "%";
      row12_sitrep.appendChild(indoorHumidityTxt);
      table_sitrep.appendChild(row12_sitrep);
    }

    if (this.config.indoorTemperature == "1"){
      var temperatureIcon = document.createElement("td");
      temperatureIcon.className = "pop wi wi-thermometer";
      row13_sitrep.appendChild(temperatureIcon);
    
      var temperature = document.createElement("td");
      temperature.className = "popr";
      temperature.innerHTML = " " + this.indoorTemperature + "&deg;";
      row13_sitrep.appendChild(temperature);
      table_sitrep.appendChild(row13_sitrep);
    }

    if (this.config.Humidity1 == "1"){ 
      var indoorHumidity1Icon = document.createElement("td");
      indoorHumidity1Icon.className = "pop wi wi-humidity lpad";
      row14_sitrep.appendChild(indoorHumidity1Icon);

      var indoorHumidity1Txt = document.createElement("td");
      indoorHumidity1Txt.className = "popr";
      indoorHumidity1Txt.innerHTML = this.Humidity1 + "%";
      row14_sitrep.appendChild(indoorHumidity1Txt);
      table_sitrep.appendChild(row14_sitrep);
    }

    if (this.config.temperature1 == "1"){
      var temperature1Icon = document.createElement("td");
      temperature1Icon.className = "pop wi wi-thermometer";
      row15_sitrep.appendChild(temperature1Icon);
    
      var temperature1 = document.createElement("td");
      temperature1.className = "popr";
      temperature1.innerHTML = " " + this.temperature1 + "&deg;";
      row15_sitrep.appendChild(temperature1);
      table_sitrep.appendChild(row15_sitrep);
    }

    if (this.config.Humidity2 == "1"){ 
      var indoorHumidity2Icon = document.createElement("td");
      indoorHumidity2Icon.className = "pop wi wi-humidity lpad";
      row16_sitrep.appendChild(indoorHumidity2Icon);

      var indoorHumidity2Txt = document.createElement("td");
      indoorHumidity2Txt.className = "popr";
      indoorHumidity2Txt.innerHTML = this.Humidity2 + "%";
      row16_sitrep.appendChild(indoorHumidity2Txt);
      table_sitrep.appendChild(row16_sitrep);
    }

    if (this.config.temperature2 == "1"){
      var temperature2Icon = document.createElement("td");
      temperature2Icon.className = "pop wi wi-thermometer";
      row17_sitrep.appendChild(temperature2Icon);
    
      var temperature2 = document.createElement("td");
      temperature2.className = "popr";
      temperature2.innerHTML = " " + this.temperature2 + "&deg;";
      row17_sitrep.appendChild(temperature2);
      table_sitrep.appendChild(row17_sitrep);
    }

    if (this.config.Humidity3 == "1"){ 
      var indoorHumidity3Icon = document.createElement("td");
      indoorHumidity3Icon.className = "pop wi wi-humidity lpad";
      row18_sitrep.appendChild(indoorHumidity3Icon);

      var indoorHumidity3Txt = document.createElement("td");
      indoorHumidity3Txt.className = "popr";
      indoorHumidity3Txt.innerHTML = "3" + this.Humidity3 + "%";
      row18_sitrep.appendChild(indoorHumidity3Txt);
      table_sitrep.appendChild(row18_sitrep);
    }

    if (this.config.temperature3 == "1"){
      var temperature3Icon = document.createElement("td");
      temperature3Icon.className = "pop wi wi-thermometer";
      row19_sitrep.appendChild(temperature3Icon);
    
      var temperature3 = document.createElement("td");
      temperature3.className = "popr";
      temperature3.innerHTML = "3" + this.temperature3 + "&deg;";
      row20_sitrep.appendChild(temperature2);
      table_sitrep.appendChild(row20_sitrep);
    }








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

    this.lightning_time = data.observations[0].lightning_time;
    this.lightning_day = data.observations[0].lightning_day;
    this.lightning_distance = data.observations[0][this.config.units].lightning_distance;
    
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
      Log.info('Wunderground received ' + notification);
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
