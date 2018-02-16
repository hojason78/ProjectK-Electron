var weatherWin,
    city = "",
    latlong = "",
    weathertemp = "";

class Weather {
    static setUpWWindow() {
        var var1 = Weather.makeElem("h4");
        var1.innerHTML = "Weather in " + city;
        weatherWin.appendChild(var1);
        Weather.getWeatherData(city);
        var var2 = Weather.makeElem("a");
        var2.href = "https://www.metaweather.com/api/";
        var2.innerHTML = "Weather information provided by MetaWeather";
        var2.style.fontSize = "6px";
        weatherWin.appendChild(var2);
    }

    static getCity() {
        $.get("http://ipinfo.io", function (response) {
            city = response.city;
            latlong = response.loc;
            latlong = latlong.split(",");
            console.log("Got city. " + city + " " + latlong[0] + " " + latlong[1]);
            Weather.setUpWWindow();
        }, "jsonp");
    }

    static getWeatherData() {
        var woeid = "";
        /*$.get("https://metaweather.com/api/location/search/?query=" + city, r => {
            woeid = r.woeid;
            $.get("https://metaweather.com/api/location/" + woeid + "/", re => {
                console.log(re.weather_state_name);
            });
        }, "json")*/
        $.get("https://metaweather.com/api/location/");
    }

    static onWReady() {
        console.log("Setting up weather window.");
        weatherWin = getAvailableContainer();
        Weather.getCity();
    }

    static makeElem(s) {
        return document.createElement(s);
    }
}

onloadfuncs.push(Weather.onWReady);

/*
$.ajax({
    url: "https://crossorigin.me/https://www.metaweather.com/api/location/search/?query=Los%20Angeles",
    type: "GET",
	crossDomain: true,
	dataType: "json",
	beforeSend: function (xhr) {
		xhr.setRequestHeader('Origin', '');
	},
    success: function (response) {
        console.log(response);
		var r = JSON.parse(response);
		console.log(r);
    },
    error: function (xhr, status) {
        // handle errors
    }
});
*/
