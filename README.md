# MMM-FOSHKplugin-PWS-Observations

A basic module for displaying local current weather data from your PWS via <a href="https://foshkplugin.phantasoft.de/generic" target="_blank">FOSHKplugin</a>

This project started life as an attempted to get the MMM-Wunderground module from https://github.com/saabman/MMM-Wunderground-PWS-Observations working for a local access via WU protocol offered by FOSHKplugin http service.
I decided to cut it down to just the data provided from your local PWS.

The Weather Icons used in this module are created and maintained by Erik Flowers. v1.0 artwork by Lukas Bischoff. v1.1 - 2.0 artwork by Erik Flowers www.weathericons.io


Requires FOSHKplugin http address http://ipaddress:port/observations/ as apiBase

See also the recipe <a href="https://foshkplugin.phantasoft.de/generic#magicmirror" target="_blank">Displaying local PWS data with FOSHKplugin on a MagicMirror</a> on FOSHKplugin web page.

## to install:
```
cd ~/MagicMirror/modules # adapt directory if you are using a different one
git clone https://github.com/git-olicat/MMM-FOSHKplugin-PWS-Observations
cd MMM-FOSHKplugin-PWS-Observations
npm install
```
<img src ="https://github.com/git-olicat/MMM-FOSHKplugin-PWS-Observations/blob/main/MMM-FOSHKplugin.png">

After installation you have to configure the modul within the modules section of config.js (just before the "]":
```
cd ~/MagicMirror/config # adapt directory if you are using a different one
vi config.js // or use your favourite editor
```
Remember: apiBase is mandatory and should contain the FOSHKplugin http URL (e.g. http://192.168.178.100:8080/observations/)

			{
				module: 'MMM-FOSHKplugin-PWS-Observations',

				position: 'top_right',
				header: 'FOSHKplugin data',
				config: {

					apiBase: 'http://ipaddress:port/observations/', // e.g. http://192.168.15.100:8096/observations/
					pws: 'FOSHKplugin',
					apikey: 'MMM',
					updateInterval: 60000,  // 1 minute = 60000 millis
					roundTmpDecs: 0,
					sysstat: 0,
					debug: 1,
					currentweather: 1,
					temperature: 1,
					humidity: 1,
					pressure: 1,
					wind: 1,
					solarRadiation: 1,
					UV: 1,
					rain: 1,               // same as rainYear
					rainRate: 1,           // rain rate
					rainDay: 0,            // rain daily
					rainWeek: 0,           // rain weekly
					rainMonth: 0,          // rain monthly
					rainYear: 0,           // rain yearly = rain = precipTotal
					rain24: 0,             // rain last 24h
					rainEvent: 0,          // rain this rain event
          piezoRate: 0,          // piezo rain rate
					piezoDay: 0,           // piezo rain daily
					piezoWeek: 0,          // piezo rain weekly
					piezoMonth: 0,         // piezo rain monthly
					piezoYear: 0,          // piezo rain yearly = rain = precipTotal
					piezo24: 0,            // piezo rain last 24h
					piezoEvent: 0,         // piezo rain this rain event
					isRaining: 0,          // piezo rain state
					dewPoint: 1,
					windChill: 1,
					heatIndex: 1,
					// new keys - choose whatever you want, but bear in mind the limited space
					aqTime: 1,             // time of measurement
					realtimeFrequency: 0   // interval
					indoorTemperature: 0,
					indoorHumidity: 0,
					temperature1: 0,
					Humidity1: 0,
					temperature2: 0,
					Humidity2: 0,
					temperature3: 0,
					Humidity3: 0,
					temperature4: 0,
					Humidity4: 0,
					temperature5: 0,
					Humidity5: 0,
					temperature6: 0,
					Humidity6: 0,
					temperature7: 0,
					Humidity7: 0,
					temperature8: 0,
					Humidity8: 0,
					soilmoisture: 0,
					soilmoisture2: 0,
					soilmoisture3: 0,
					soilmoisture4: 0,
					soilmoisture5: 0,
					soilmoisture6: 0,
					soilmoisture7: 0,
					soilmoisture8: 0,
					soilmoisture9: 0,
					soilmoisture10: 0,
					soilmoisture11: 0,
					soilmoisture12: 0,
					soilmoisture13: 0,
					soilmoisture14: 0,
					soilmoisture15: 0,
					soilmoisture16: 0,
					soiltemp: 0,
					soiltemp2: 0,
					soiltemp3: 0,
					soiltemp4: 0,
					soiltemp5: 0,
					soiltemp6: 0,
					soiltemp7: 0,
					soiltemp8: 0,
					lightning_day: 0,
					lightning_distance: 0,
					lightning_time: 0,
				}
			},

## Configuration options

The following properties can be configured:


<table width="100%">
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>apiBase</code></td>
			<td>The FOSHKplugin http URL
				<br> This value is <b>REQUIRED</b>
			</td>
		</tr>
		<tr>
			<td><code>apikey</code></td>
			<td>The Weather Underground API key
				<br> This value is optional.
			</td>
		</tr>
		<tr>
			<td><code>wind</code></td>
			<td>Displays wind data<br>
				<br><b>Possible values:</b> <code>1</code> - <code>0</code>
				<br><b>Default value:</b> <code>1</code> (Will display data)
				<br>This value is optional. By default the data will be displayed
			</td>
		</tr>
		<tr>
			<td><code>humidity</code></td>
			<td>Displays humidity data<br>
				<br><b>Possible values:</b> <code>0</code> - <code>1</code>
				<br><b>Default value:</b> <code>1</code> (Will display data)
				<br>This value is optional. By default the data will be displayed.
			</td>
		</tr>
		<tr>
			<td><code>UV</code></td>
			<td>Displays UV data<br>
				<br><b>Possible values:</b> <code>0</code> - <code>1</code>
				<br><b>Default value:</b> <code>0</code> (Will not display data)
				<br>This value is optional. By default the data will not be displayed.
			</td>
		</tr>
		<tr>
			<td><code>rain</code></td>
			<td>Displays rain fall data<br>
				<br><b>Possible values:</b> <code>0</code> - <code>1</code>
				<br><b>Default value:</b> <code>1</code> (Will display data)
				<br>This value is optional. By default the data will be displayed.
			</td>
		</tr>
		<tr>
			<td><code>rainRate</code></td>
			<td>Displays rain rate data<br>
				<br><b>Possible values:</b> <code>0</code> - <code>1</code>
				<br><b>Default value:</b> <code>1</code> (Will display data)
				<br>This value is optional. By default the data will be displayed.
			</td>
		</tr>
		<tr>
			<td><code>pressure</code></td>
			<td>Displays atmospheric pressure data<br>
				<br><b>Possible values:</b> <code>0</code> - <code>1</code>
				<br><b>Default value:</b> <code>1</code> (Will display data)
				<br>This value is optional. By default the data will be displayed.
			</td>
		</tr>
		<tr>
			<td><code>dewpoint</code></td>
			<td>Displays dewpoint temperature<br>
				<br><b>Possible values:</b> <code>0</code> - <code>1</code>
				<br><b>Default value:</b> <code>1</code> (Will display data)
				<br>This value is optional. By default the data will be displayed.
			</td>
		</tr>
		<tr>
			<td><code>windChill</code></td>
			<td>Displays wind chill temperature<br>
				<br><b>Possible values:</b> <code>0</code> - <code>1</code>
				<br><b>Default value:</b> <code>1</code> (Will display data)
				<br>This value is optional. By default the data will be displayed.
			</td>
		</tr>
		<tr>
			<td><code>heatIndex</code></td>
			<td>Displays heat index temperature<br>
				<br><b>Possible values:</b> <code>0</code> - <code>1</code>
				<br><b>Default value:</b> <code>1</code> (Will display data)
				<br>This value is optional. By default the data will be displayed.
			</td>
		</tr>
		<tr>
			<td><code>temperature</code></td>
			<td>Displays current temperature<br>
				<br><b>Possible values:</b> <code>0</code> - <code>1</code>
				<br><b>Default value:</b> <code>1</code> (Will display data)
				<br>This value is optional. By default the data will be displayed.
			</td>
		</tr>
		<tr>
			<td><code>updateInterval</code></td>
			<td>How often does the content needs to be fetched? (Milliseconds)
				<br>There're no restriction with FOSHKplugin, you may update as often as you like
				<br><b>Possible values:</b> <code>1000</code> - <code>86400000</code>
				<br><b>Default value:</b> <code>60000</code> (1 minute)
			</td>
		</tr>
		<tr>
			<td><code>animationSpeed</code></td>
			<td>Speed of the update animation. (Milliseconds)<br>
				<br><b>Possible values:</b><code>0</code> - <code>5000</code>
				<br><b>Default value:</b> <code>2000</code> (2 seconds)
			</td>
		</tr>
		<tr>
			<td><code>lang</code></td>
			<td>The language of the days.<br>
				<br><b>Possible values:</b> <code>en</code>, <code>nl</code>, <code>ru</code>, etc ...
				<br><b>Default value:</b> uses value of <i>config.language</i>
			</td>
		</tr>
		<tr>
			<td><code>sysstat</code></td>
			<td>Toggle sysinfo display<br>
				<br><b>Possible values:</b> <code>0 or 1</code>
				<br><b>Default value:</b>  <code>0</code>
			</td>
		</tr>
		<tr>
			<td><code>debug</code></td>
			<td>Toggle debug logging<br>
				<br><b>Possible values:</b> <code>0 or 1</code>
				<br><b>Default value:</b>  <code>0</code>
			</td>
		</tr>
	</tbody>
</table>
