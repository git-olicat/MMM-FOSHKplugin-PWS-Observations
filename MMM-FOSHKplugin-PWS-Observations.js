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
    rain: 1,
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
    var row21_sitrep = document.createElement("tr");
    var row22_sitrep = document.createElement("tr");
    var row23_sitrep = document.createElement("tr");
    var row24_sitrep = document.createElement("tr");
    var row25_sitrep = document.createElement("tr");
    var row26_sitrep = document.createElement("tr");
    var row27_sitrep = document.createElement("tr");
    var row28_sitrep = document.createElement("tr");
    var row29_sitrep = document.createElement("tr");
    var row30_sitrep = document.createElement("tr");
    var row31_sitrep = document.createElement("tr");
    var row32_sitrep = document.createElement("tr");
    var row33_sitrep = document.createElement("tr");
    var row34_sitrep = document.createElement("tr");
    var row35_sitrep = document.createElement("tr");
    var row36_sitrep = document.createElement("tr");
    var row37_sitrep = document.createElement("tr");
    var row38_sitrep = document.createElement("tr");
    var row39_sitrep = document.createElement("tr");
    var row40_sitrep = document.createElement("tr");
    var row41_sitrep = document.createElement("tr");
    var row42_sitrep = document.createElement("tr");
    var row43_sitrep = document.createElement("tr");
    var row44_sitrep = document.createElement("tr");
    var row45_sitrep = document.createElement("tr");
    var row46_sitrep = document.createElement("tr");
    var row47_sitrep = document.createElement("tr");
    var row48_sitrep = document.createElement("tr");
    var row49_sitrep = document.createElement("tr");
    var row50_sitrep = document.createElement("tr");
    var row51_sitrep = document.createElement("tr");
    var row52_sitrep = document.createElement("tr");
    var row53_sitrep = document.createElement("tr");
    var row54_sitrep = document.createElement("tr");
    var row55_sitrep = document.createElement("tr");
    var row56_sitrep = document.createElement("tr");
    var row57_sitrep = document.createElement("tr");
    var row58_sitrep = document.createElement("tr");
    var row59_sitrep = document.createElement("tr");
    var row60_sitrep = document.createElement("tr");
  
    if (this.config.temperature == "1"){
      var temperatureIcon = document.createElement("td");
      temperatureIcon.className = "pop wi wi-thermometer";
      temperatureIcon.innerHTML = "out";
      row10_sitrep.appendChild(temperatureIcon);

      var temperature = document.createElement("td");
      temperature.className = "popr";
      temperature.innerHTML = " " + this.temperature + "&deg;";
      row10_sitrep.appendChild(temperature);
      table_sitrep.appendChild(row10_sitrep);
    }

    if (this.config.humidity == "1"){
      var HumidityIcon = document.createElement("td");
      HumidityIcon.className = "pop wi wi-humidity lpad";
      HumidityIcon.innerHTML = "out";
      row2_sitrep.appendChild(HumidityIcon);

      var HumidityTxt = document.createElement("td");
      HumidityTxt.className = "popr";
      HumidityTxt.innerHTML = this.Humidity + "%";
      row2_sitrep.appendChild(HumidityTxt);
      table_sitrep.appendChild(row2_sitrep);
    }
    
    if (this.config.pressure == "1"){
      var pressureIcon = document.createElement("td");
      pressureIcon.className = "pop wi wi-barometer";
      row6_sitrep.appendChild(pressureIcon);
      
      var pressure = document.createElement("td");
      pressure.className ="popr";
      if (this.config.units == "metric") {
        pressure.innerHTML = " " + this.pressure + "hPa";
      } else {
        pressure.innerHTML = " " + this.pressure + "inHg";
      }
      row6_sitrep.appendChild(pressure);
      table_sitrep.appendChild(row6_sitrep);
    }
    
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
        windGust.innerHTML = " " + this.windGust + "kmh";
      } else {
        windGust.innerHTML = " " + this.windGust + "mph";
      }
      row1_sitrep.appendChild(windGust);
      table_sitrep.appendChild(row1_sitrep);
    }

    if (this.config.solarRadiation == "1"){
      var solarRadiationIcon = document.createElement("td");
      solarRadiationIcon.className = "pop wi wi-hot lpad";
      solarRadiationIcon.innerHTML = "SR";
      row11_sitrep.appendChild(solarRadiationIcon);

      var solarRadiationTxt = document.createElement("td");
      solarRadiationTxt.className = "popr";
      solarRadiationTxt.innerHTML = this.solarRadiation + "W/m²";
      row11_sitrep.appendChild(solarRadiationTxt);
      table_sitrep.appendChild(row11_sitrep);
    }

    if (this.config.UV == "1"){
      var UVIcon = document.createElement("td");
      UVIcon.className = "pop wi wi-hot";
      UVIcon.innerHTML = "UV";
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

    if (this.config.indoorTemperature == "1"){
      var indoorTemperatureIcon = document.createElement("td");
      indoorTemperatureIcon.className = "pop wi wi-thermometer";
      indoorTemperatureIcon.innerHTML = "in";
      row13_sitrep.appendChild(indoorTemperatureIcon);

      var indoorTemperature = document.createElement("td");
      indoorTemperature.className = "popr";
      indoorTemperature.innerHTML = " " + this.indoorTemperature + "&deg;";
      row13_sitrep.appendChild(indoorTemperature);
      table_sitrep.appendChild(row13_sitrep);
    }

    if (this.config.indoorHumidity == "1"){
      var indoorHumidityIcon = document.createElement("td");
      indoorHumidityIcon.className = "pop wi wi-humidity lpad";
      indoorHumidityIcon.innerHTML = "in";
      row12_sitrep.appendChild(indoorHumidityIcon);

      var indoorHumidityTxt = document.createElement("td");
      indoorHumidityTxt.className = "popr";
      indoorHumidityTxt.innerHTML = this.indoorHumidity + "%";
      row12_sitrep.appendChild(indoorHumidityTxt);
      table_sitrep.appendChild(row12_sitrep);
    }

    if (this.config.temperature1 == "1"){
      var temperature1Icon = document.createElement("td");
      temperature1Icon.className = "pop wi wi-thermometer";
      temperature1Icon.innerHTML = "1";
      row15_sitrep.appendChild(temperature1Icon);

      var temperature1 = document.createElement("td");
      temperature1.className = "popr";
      temperature1.innerHTML = " " + this.temperature1 + "&deg;";
      row15_sitrep.appendChild(temperature1);
      table_sitrep.appendChild(row15_sitrep);
    }

    if (this.config.Humidity1 == "1"){
      var indoorHumidity1Icon = document.createElement("td");
      indoorHumidity1Icon.className = "pop wi wi-humidity lpad";
      indoorHumidity1Icon.innerHTML = "1";
      row14_sitrep.appendChild(indoorHumidity1Icon);

      var indoorHumidity1Txt = document.createElement("td");
      indoorHumidity1Txt.className = "popr";
      indoorHumidity1Txt.innerHTML = this.Humidity1 + "%";
      row14_sitrep.appendChild(indoorHumidity1Txt);
      table_sitrep.appendChild(row14_sitrep);
    }

    if (this.config.temperature2 == "1"){
      var temperature2Icon = document.createElement("td");
      temperature2Icon.className = "pop wi wi-thermometer";
      temperature2Icon.innerHTML = "2";
      row17_sitrep.appendChild(temperature2Icon);

      var temperature2 = document.createElement("td");
      temperature2.className = "popr";
      temperature2.innerHTML = " " + this.temperature2 + "&deg;";
      row17_sitrep.appendChild(temperature2);
      table_sitrep.appendChild(row17_sitrep);
    }

    if (this.config.Humidity2 == "1"){
      var indoorHumidity2Icon = document.createElement("td");
      indoorHumidity2Icon.className = "pop wi wi-humidity lpad";
      indoorHumidity2Icon.innerHTML = "2";
      row16_sitrep.appendChild(indoorHumidity2Icon);

      var indoorHumidity2Txt = document.createElement("td");
      indoorHumidity2Txt.className = "popr";
      indoorHumidity2Txt.innerHTML = this.Humidity2 + "%";
      row16_sitrep.appendChild(indoorHumidity2Txt);
      table_sitrep.appendChild(row16_sitrep);
    }

    if (this.config.temperature3 == "1"){
      var temperature3Icon = document.createElement("td");
      temperature3Icon.className = "pop wi wi-thermometer";
      temperature3Icon.innerHTML = "3";
      row19_sitrep.appendChild(temperature3Icon);

      var temperature3 = document.createElement("td");
      temperature3.className = "popr";
      temperature3.innerHTML = " " + this.temperature3 + "&deg;";
      row19_sitrep.appendChild(temperature3);
      table_sitrep.appendChild(row19_sitrep);
    }

    if (this.config.Humidity3 == "1"){
      var indoorHumidity3Icon = document.createElement("td");
      indoorHumidity3Icon.className = "pop wi wi-humidity lpad";
      indoorHumidity3Icon.innerHTML = "3";
      row18_sitrep.appendChild(indoorHumidity3Icon);

      var indoorHumidity3Txt = document.createElement("td");
      indoorHumidity3Txt.className = "popr";
      indoorHumidity3Txt.innerHTML = " " + this.Humidity3 + "%";
      row18_sitrep.appendChild(indoorHumidity3Txt);
      table_sitrep.appendChild(row18_sitrep);
    }

    if (this.config.temperature4 == "1"){
      var temperature4Icon = document.createElement("td");
      temperature4Icon.className = "pop wi wi-thermometer";
      temperature4Icon.innerHTML = "4";
      row21_sitrep.appendChild(temperature4Icon);

      var temperature4 = document.createElement("td");
      temperature4.className = "popr";
      temperature4.innerHTML = " " + this.temperature4 + "&deg;";
      row21_sitrep.appendChild(temperature4);
      table_sitrep.appendChild(row21_sitrep);
    }

    if (this.config.Humidity4 == "1"){
      var indoorHumidity4Icon = document.createElement("td");
      indoorHumidity4Icon.className = "pop wi wi-humidity lpad";
      indoorHumidity4Icon.innerHTML = "4";
      row20_sitrep.appendChild(indoorHumidity4Icon);

      var indoorHumidity4Txt = document.createElement("td");
      indoorHumidity4Txt.className = "popr";
      indoorHumidity4Txt.innerHTML = " " + this.Humidity4 + "%";
      row20_sitrep.appendChild(indoorHumidity4Txt);
      table_sitrep.appendChild(row20_sitrep);
    }

    if (this.config.temperature5 == "1"){
      var temperature5Icon = document.createElement("td");
      temperature5Icon.className = "pop wi wi-thermometer";
      temperature5Icon.innerHTML = "5";
      row23_sitrep.appendChild(temperature5Icon);

      var temperature5 = document.createElement("td");
      temperature5.className = "popr";
      temperature5.innerHTML = " " + this.temperature5 + "&deg;";
      row23_sitrep.appendChild(temperature5);
      table_sitrep.appendChild(row23_sitrep);
    }

    if (this.config.Humidity5 == "1"){
      var indoorHumidity5Icon = document.createElement("td");
      indoorHumidity5Icon.className = "pop wi wi-humidity lpad";
      indoorHumidity5Icon.innerHTML = "5";
      row22_sitrep.appendChild(indoorHumidity5Icon);

      var indoorHumidity5Txt = document.createElement("td");
      indoorHumidity5Txt.className = "popr";
      indoorHumidity5Txt.innerHTML = " " + this.Humidity5 + "%";
      row22_sitrep.appendChild(indoorHumidity5Txt);
      table_sitrep.appendChild(row22_sitrep);
    }

    if (this.config.temperature6 == "1"){
      var temperature6Icon = document.createElement("td");
      temperature6Icon.className = "pop wi wi-thermometer";
      temperature6Icon.innerHTML = "6";
      row25_sitrep.appendChild(temperature6Icon);

      var temperature6 = document.createElement("td");
      temperature6.className = "popr";
      temperature6.innerHTML = " " + this.temperature6 + "&deg;";
      row25_sitrep.appendChild(temperature6);
      table_sitrep.appendChild(row25_sitrep);
    }

    if (this.config.Humidity6 == "1"){
      var indoorHumidity6Icon = document.createElement("td");
      indoorHumidity6Icon.className = "pop wi wi-humidity lpad";
      indoorHumidity6Icon.innerHTML = "6";
      row24_sitrep.appendChild(indoorHumidity6Icon);

      var indoorHumidity6Txt = document.createElement("td");
      indoorHumidity6Txt.className = "popr";
      indoorHumidity6Txt.innerHTML = " " + this.Humidity6 + "%";
      row24_sitrep.appendChild(indoorHumidity6Txt);
      table_sitrep.appendChild(row24_sitrep);
    }

    if (this.config.temperature7 == "1"){
      var temperature7Icon = document.createElement("td");
      temperature7Icon.className = "pop wi wi-thermometer";
      temperature7Icon.innerHTML = "7";
      row27_sitrep.appendChild(temperature7Icon);

      var temperature7 = document.createElement("td");
      temperature7.className = "popr";
      temperature7.innerHTML = " " + this.temperature7 + "&deg;";
      row27_sitrep.appendChild(temperature7);
      table_sitrep.appendChild(row27_sitrep);
    }

    if (this.config.Humidity7 == "1"){
      var indoorHumidity7Icon = document.createElement("td");
      indoorHumidity7Icon.className = "pop wi wi-humidity lpad";
      indoorHumidity7Icon.innerHTML = "7";
      row26_sitrep.appendChild(indoorHumidity7Icon);

      var indoorHumidity7Txt = document.createElement("td");
      indoorHumidity7Txt.className = "popr";
      indoorHumidity7Txt.innerHTML = " " + this.Humidity6 + "%";
      row26_sitrep.appendChild(indoorHumidity7Txt);
      table_sitrep.appendChild(row26_sitrep);
    }

    if (this.config.temperature8 == "1"){
      var temperature8Icon = document.createElement("td");
      temperature8Icon.className = "pop wi wi-thermometer";
      temperature8Icon.innerHTML = "8";
      row29_sitrep.appendChild(temperature8Icon);

      var temperature8 = document.createElement("td");
      temperature8.className = "popr";
      temperature8.innerHTML = " " + this.temperature8 + "&deg;";
      row29_sitrep.appendChild(temperature8);
      table_sitrep.appendChild(row29_sitrep);
    }

    if (this.config.Humidity8 == "1"){
      var indoorHumidity8Icon = document.createElement("td");
      indoorHumidity8Icon.className = "pop wi wi-humidity lpad";
      indoorHumidity8Icon.innerHTML = "8";
      row28_sitrep.appendChild(indoorHumidity8Icon);

      var indoorHumidity8Txt = document.createElement("td");
      indoorHumidity8Txt.className = "popr";
      indoorHumidity8Txt.innerHTML = " " + this.Humidity8 + "%";
      row28_sitrep.appendChild(indoorHumidity8Txt);
      table_sitrep.appendChild(row28_sitrep);
    }

    if (this.config.soilmoisture == "1"){
      var soilmoistureIcon = document.createElement("td");
      soilmoistureIcon.className = "pop";
      soilmoistureIcon.innerHTML = "SM1";
      row30_sitrep.appendChild(soilmoistureIcon);

      var soilmoistureTxt = document.createElement("td");
      soilmoistureTxt.className = "popr";
      soilmoistureTxt.innerHTML = this.soilmoisture + "%";
      row30_sitrep.appendChild(soilmoistureTxt);
      table_sitrep.appendChild(row30_sitrep);
    }

    if (this.config.soilmoisture2 == "1"){
      var soilmoisture2Icon = document.createElement("td");
      soilmoisture2Icon.className = "pop";
      soilmoisture2Icon.innerHTML = "SM2";
      row31_sitrep.appendChild(soilmoisture2Icon);

      var soilmoisture2Txt = document.createElement("td");
      soilmoisture2Txt.className = "popr";
      soilmoisture2Txt.innerHTML = this.soilmoisture2 + "%";
      row31_sitrep.appendChild(soilmoisture2Txt);
      table_sitrep.appendChild(row31_sitrep);
    }

    if (this.config.soilmoisture3 == "1"){
      var soilmoisture3Icon = document.createElement("td");
      soilmoisture3Icon.className = "pop";
      soilmoisture3Icon.innerHTML = "SM3";
      row32_sitrep.appendChild(soilmoisture3Icon);

      var soilmoisture3Txt = document.createElement("td");
      soilmoisture3Txt.className = "popr";
      soilmoisture3Txt.innerHTML = this.soilmoisture3 + "%";
      row32_sitrep.appendChild(soilmoisture3Txt);
      table_sitrep.appendChild(row32_sitrep);
    }

    if (this.config.soilmoisture4 == "1"){
      var soilmoisture4Icon = document.createElement("td");
      soilmoisture4Icon.className = "pop";
      soilmoisture4Icon.innerHTML = "SM4";
      row33_sitrep.appendChild(soilmoisture4Icon);

      var soilmoisture4Txt = document.createElement("td");
      soilmoisture4Txt.className = "popr";
      soilmoisture4Txt.innerHTML = this.soilmoisture4 + "%";
      row33_sitrep.appendChild(soilmoisture4Txt);
      table_sitrep.appendChild(row33_sitrep);
    }
    if (this.config.soilmoisture5 == "1"){
      var soilmoisture5Icon = document.createElement("td");
      soilmoisture5Icon.className = "pop";
      soilmoisture5Icon.innerHTML = "SM5";
      row34_sitrep.appendChild(soilmoisture5Icon);

      var soilmoisture5Txt = document.createElement("td");
      soilmoisture5Txt.className = "popr";
      soilmoisture5Txt.innerHTML = this.soilmoisture5 + "%";
      row34_sitrep.appendChild(soilmoisture5Txt);
      table_sitrep.appendChild(row34_sitrep);
    }
    if (this.config.soilmoisture6 == "1"){
      var soilmoisture6Icon = document.createElement("td");
      soilmoisture6Icon.className = "pop";
      soilmoisture6Icon.innerHTML = "SM6";
      row35_sitrep.appendChild(soilmoisture6Icon);

      var soilmoisture6Txt = document.createElement("td");
      soilmoisture6Txt.className = "popr";
      soilmoisture6Txt.innerHTML = this.soilmoisture6 + "%";
      row35_sitrep.appendChild(soilmoisture6Txt);
      table_sitrep.appendChild(row35_sitrep);
    }
    if (this.config.soilmoisture7 == "1"){
      var soilmoisture7Icon = document.createElement("td");
      soilmoisture7Icon.className = "pop";
      soilmoisture7Icon.innerHTML = "SM7";
      row36_sitrep.appendChild(soilmoisture7Icon);

      var soilmoisture7Txt = document.createElement("td");
      soilmoisture7Txt.className = "popr";
      soilmoisture7Txt.innerHTML = this.soilmoisture7 + "%";
      row36_sitrep.appendChild(soilmoisture7Txt);
      table_sitrep.appendChild(row36_sitrep);
    }
    if (this.config.soilmoisture8 == "1"){
      var soilmoisture8Icon = document.createElement("td");
      soilmoisture8Icon.className = "pop";
      soilmoisture8Icon.innerHTML = "SM8";
      row37_sitrep.appendChild(soilmoisture8Icon);

      var soilmoisture8Txt = document.createElement("td");
      soilmoisture8Txt.className = "popr";
      soilmoisture8Txt.innerHTML = this.soilmoisture8 + "%";
      row37_sitrep.appendChild(soilmoisture8Txt);
      table_sitrep.appendChild(row37_sitrep);
    }
    if (this.config.soilmoisture9 == "1"){
      var soilmoisture9Icon = document.createElement("td");
      soilmoisture9Icon.className = "pop";
      soilmoisture9Icon.innerHTML = "SM9";
      row38_sitrep.appendChild(soilmoisture9Icon);

      var soilmoisture9Txt = document.createElement("td");
      soilmoisture9Txt.className = "popr";
      soilmoisture9Txt.innerHTML = this.soilmoisture9 + "%";
      row38_sitrep.appendChild(soilmoisture9Txt);
      table_sitrep.appendChild(row38_sitrep);
    }
    if (this.config.soilmoisture10 == "1"){
      var soilmoisture10Icon = document.createElement("td");
      soilmoisture10Icon.className = "pop";
      soilmoisture10Icon.innerHTML = "SM10";
      row39_sitrep.appendChild(soilmoisture10Icon);

      var soilmoisture10Txt = document.createElement("td");
      soilmoisture10Txt.className = "popr";
      soilmoisture10Txt.innerHTML = this.soilmoisture10 + "%";
      row39_sitrep.appendChild(soilmoisture10Txt);
      table_sitrep.appendChild(row39_sitrep);
    }
    if (this.config.soilmoisture11 == "1"){
      var soilmoisture11Icon = document.createElement("td");
      soilmoisture11Icon.className = "pop";
      soilmoisture11Icon.innerHTML = "SM11";
      row40_sitrep.appendChild(soilmoisture11Icon);

      var soilmoisture11Txt = document.createElement("td");
      soilmoisture11Txt.className = "popr";
      soilmoisture11Txt.innerHTML = this.soilmoisture11 + "%";
      row40_sitrep.appendChild(soilmoisture11Txt);
      table_sitrep.appendChild(row40_sitrep);
    }
    if (this.config.soilmoisture12 == "1"){
      var soilmoisture12Icon = document.createElement("td");
      soilmoisture12Icon.className = "pop";
      soilmoisture12Icon.innerHTML = "SM12";
      row41_sitrep.appendChild(soilmoisture12Icon);

      var soilmoisture12Txt = document.createElement("td");
      soilmoisture12Txt.className = "popr";
      soilmoisture12Txt.innerHTML = this.soilmoisture12 + "%";
      row41_sitrep.appendChild(soilmoisture12Txt);
      table_sitrep.appendChild(row41_sitrep);
    }
    if (this.config.soilmoisture13 == "1"){
      var soilmoisture13Icon = document.createElement("td");
      soilmoisture13Icon.className = "pop";
      soilmoisture13Icon.innerHTML = "SM13";
      row42_sitrep.appendChild(soilmoisture13Icon);

      var soilmoisture13Txt = document.createElement("td");
      soilmoisture13Txt.className = "popr";
      soilmoisture13Txt.innerHTML = this.soilmoisture13 + "%";
      row42_sitrep.appendChild(soilmoisture13Txt);
      table_sitrep.appendChild(row42_sitrep);
    }
    if (this.config.soilmoisture14 == "1"){
      var soilmoisture14Icon = document.createElement("td");
      soilmoisture14Icon.className = "pop";
      soilmoisture14Icon.innerHTML = "SM14";
      row43_sitrep.appendChild(soilmoisture14Icon);

      var soilmoisture14Txt = document.createElement("td");
      soilmoisture14Txt.className = "popr";
      soilmoisture14Txt.innerHTML = this.soilmoisture14 + "%";
      row43_sitrep.appendChild(soilmoisture14Txt);
      table_sitrep.appendChild(row43_sitrep);
    }
    if (this.config.soilmoisture15 == "1"){
      var soilmoisture15Icon = document.createElement("td");
      soilmoisture15Icon.className = "pop";
      soilmoisture15Icon.innerHTML = "SM15";
      row44_sitrep.appendChild(soilmoisture15Icon);

      var soilmoisture15Txt = document.createElement("td");
      soilmoisture15Txt.className = "popr";
      soilmoisture15Txt.innerHTML = this.soilmoisture15 + "%";
      row44_sitrep.appendChild(soilmoisture15Txt);
      table_sitrep.appendChild(row44_sitrep);
    }
    if (this.config.soilmoisture16 == "1"){
      var soilmoisture16Icon = document.createElement("td");
      soilmoisture16Icon.className = "pop";
      soilmoisture16Icon.innerHTML = "SM16";
      row45_sitrep.appendChild(soilmoisture16Icon);

      var soilmoisture16Txt = document.createElement("td");
      soilmoisture16Txt.className = "popr";
      soilmoisture16Txt.innerHTML = this.soilmoisture16 + "%";
      row45_sitrep.appendChild(soilmoisture16Txt);
      table_sitrep.appendChild(row45_sitrep);
    }

    if (this.config.soiltemp == "1"){
      var soiltempIcon = document.createElement("td");
      soiltempIcon.className = "pop wi wi-thermometer-exterior";
      soiltempIcon.innerHTML = "1";
      row46_sitrep.appendChild(soiltempIcon);

      var soiltemp = document.createElement("td");
      soiltemp.className = "popr";
      soiltemp.innerHTML = " " + this.soiltemp + "&deg;";
      row46_sitrep.appendChild(soiltemp);
      table_sitrep.appendChild(row46_sitrep);
    }

    if (this.config.soiltemp2 == "1"){
      var soiltemp2Icon = document.createElement("td");
      soiltemp2Icon.className = "pop wi wi-thermometer-exterior";
      soiltemp2Icon.innerHTML = "2";
      row47_sitrep.appendChild(soiltemp2Icon);

      var soiltemp2 = document.createElement("td");
      soiltemp2.className = "popr";
      soiltemp2.innerHTML = " " + this.soiltemp2 + "&deg;";
      row47_sitrep.appendChild(soiltemp2);
      table_sitrep.appendChild(row47_sitrep);
    }

    if (this.config.soiltemp3 == "1"){
      var soiltemp3Icon = document.createElement("td");
      soiltemp3Icon.className = "pop wi wi-thermometer-exterior";
      soiltemp3Icon.innerHTML = "3";
      row48_sitrep.appendChild(soiltemp3Icon);

      var soiltemp3 = document.createElement("td");
      soiltemp3.className = "popr";
      soiltemp3.innerHTML = " " + this.soiltemp3 + "&deg;";
      row48_sitrep.appendChild(soiltemp3);
      table_sitrep.appendChild(row48_sitrep);
    }

    if (this.config.soiltemp4 == "1"){
      var soiltemp4Icon = document.createElement("td");
      soiltemp4Icon.className = "pop wi wi-thermometer-exterior";
      soiltemp4Icon.innerHTML = "4";
      row49_sitrep.appendChild(soiltemp4Icon);

      var soiltemp4 = document.createElement("td");
      soiltemp4.className = "popr";
      soiltemp4.innerHTML = " " + this.soiltemp4 + "&deg;";
      row49_sitrep.appendChild(soiltemp4);
      table_sitrep.appendChild(row49_sitrep);
    }

    if (this.config.soiltemp5 == "1"){
      var soiltemp5Icon = document.createElement("td");
      soiltemp5Icon.className = "pop wi wi-thermometer-exterior";
      soiltemp5Icon.innerHTML = "5";
      row50_sitrep.appendChild(soiltemp5Icon);

      var soiltemp5 = document.createElement("td");
      soiltemp5.className = "popr";
      soiltemp5.innerHTML = " " + this.soiltemp5 + "&deg;";
      row50_sitrep.appendChild(soiltemp5);
      table_sitrep.appendChild(row50_sitrep);
    }

    if (this.config.soiltemp6 == "1"){
      var soiltemp6Icon = document.createElement("td");
      soiltemp6Icon.className = "pop wi wi-thermometer-exterior";
      soiltemp6Icon.innerHTML = "6";
      row51_sitrep.appendChild(soiltemp6Icon);

      var soiltemp6 = document.createElement("td");
      soiltemp6.className = "popr";
      soiltemp6.innerHTML = " " + this.soiltemp6 + "&deg;";
      row51_sitrep.appendChild(soiltemp6);
      table_sitrep.appendChild(row51_sitrep);
    }

    if (this.config.soiltemp7 == "1"){
      var soiltemp7Icon = document.createElement("td");
      soiltemp7Icon.className = "pop wi wi-thermometer-exterior";
      soiltemp7Icon.innerHTML = "7";
      row52_sitrep.appendChild(soiltemp7Icon);

      var soiltemp7 = document.createElement("td");
      soiltemp7.className = "popr";
      soiltemp7.innerHTML = " " + this.soiltemp7 + "&deg;";
      row52_sitrep.appendChild(soiltemp7);
      table_sitrep.appendChild(row52_sitrep);
    }

    if (this.config.soiltemp8 == "1"){
      var soiltemp8Icon = document.createElement("td");
      soiltemp8Icon.className = "pop wi wi-thermometer-exterior";
      soiltemp8Icon.innerHTML = "8";
      row53_sitrep.appendChild(soiltemp8Icon);

      var soiltemp8 = document.createElement("td");
      soiltemp8.className = "popr";
      soiltemp8.innerHTML = " " + this.soiltemp8 + "&deg;";
      row53_sitrep.appendChild(soiltemp8);
      table_sitrep.appendChild(row53_sitrep);
    }

    if (this.config.lightning_time == "1"){
      var lightning_timeIcon = document.createElement("td");
      lightning_timeIcon.className = "pop wi wi-lightning";
      row54_sitrep.appendChild(lightning_timeIcon);

      const lightningTime = new Date(this.lightning_time * 1000);
      lightningHuman = lightningTime.toLocaleDateString(config.locale)+ " " + lightningTime.toLocaleTimeString(config.locale);
  
      var lightning_time = document.createElement("td");
      lightning_time.className = "poplightningr";
      lightning_time.innerHTML = " " + lightningHuman + "";
      row54_sitrep.appendChild(lightning_time);
      table_sitrep.appendChild(row54_sitrep);
    }

    if (this.config.lightning_day == "1"){
      var lightning_dayIcon = document.createElement("td");
      lightning_dayIcon.className = "pop wi wi-lightning";
      row55_sitrep.appendChild(lightning_dayIcon);

      var lightning_day = document.createElement("td");
      lightning_day.className = "popr";
      lightning_day.innerHTML = " " + this.lightning_day + "";
      row55_sitrep.appendChild(lightning_day);
      table_sitrep.appendChild(row55_sitrep);
    }

    if (this.config.lightning_distance == "1"){
      var lightning_distanceIcon = document.createElement("td");
      lightning_distanceIcon.className = "pop wi wi-lightning";
      row56_sitrep.appendChild(lightning_distanceIcon);

      var lightning_distance = document.createElement("td");
      lightning_distance.className = "popr";
      if (this.config.units == "metric") {
        lightning_distance.innerHTML = " " + this.lightning_distance + "km";
      } else {
        lightning_distance.innerHTML = " " + this.lightning_distance + "mi";
      }
      row56_sitrep.appendChild(lightning_distance);
      table_sitrep.appendChild(row56_sitrep);
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

    this.lightning_time = data.observations[0].lightningTime;
    this.lightning_day = data.observations[0].lightningCount;
    this.lightning_distance = data.observations[0][this.config.units].lightningDistance;

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
