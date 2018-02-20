var weatherWin,
    weatherDataDiv,
    city = "",
    latlong = "",
    woeid = "";

var tempType = "f";

var wData;

class Weather {
    static e(w) {
        var x = w + " asdf ";
        if (w.contains("snow") || w.contains("sleet") || w.contains("flurr")) {
            // Snow
            return "https://www.metaweather.com/static/img/weather/png/" + "sn" + ".png";
        } else if (w.contains("rain") || w.contains("drizzle") || w.contains("hail") || w.contains("showers")) {
            // Rain
            return "https://www.metaweather.com/static/img/weather/png/" + "lr" + ".png";
        } else if (w.contains("cloud")) {
            // Cloudy
            return "https://www.metaweather.com/static/img/weather/png/" + "hc" + ".png";
        } else if (w.contains("storm")) {
            // Thunderstorm
            return "https://www.metaweather.com/static/img/weather/png/" + "t" + ".png";
        } else {
            // Clear
            return "https://www.metaweather.com/static/img/weather/png/" + "c" + ".png";
        }
    }
    static setUpWWindow() {
        weatherWin.innerHTML = "";
        var location = wData.query.results.channel.location;
        var var1 = Util.makeElemInner("h4", location.city)
        var1.style.fontSize = "14px";
        var1.className = "wTitle";
        weatherWin.appendChild(var1);

        weatherDataDiv = Util.makeElem("div");
        weatherDataDiv.className = "wData";
        weatherWin.appendChild(weatherDataDiv);

        var var2 = Util.makeElemInner("a", "Powered by Yahoo!");
        var2.className = "wSource";
        var2.href = "https://www.yahoo.com";
        var2.style.fontSize = "6px";
        weatherWin.appendChild(var2);
        var2.style.color = "white";
    }

    static loadData() {
        Weather.setUpWWindow();

        var tenDay = wData.query.results.channel.item.forecast;
        var cond = wData.query.results.channel.item.condition;
        
        var wImg = Util.makeElem("img");
        wImg.src = Weather.e(cond.text);
        wImg.style.marginTop = "-12px";
        wImg.style.height = "3em";
        weatherDataDiv.appendChild(wImg);
        
        var condition = Util.makeElemInner("div",
            "" + cond.text +
            " - " +
            cond.temp + "&deg; " + tempType.toUpperCase() +
            " | " + "<br />" +
            "<b>High: </b>" +
            tenDay[0].high +
            " <b>Low: </b>" + tenDay[0].low + "<br /><br />");
        condition.className = "wDataToday";
        condition.style.fontSize = ".70em";
        weatherDataDiv.appendChild(condition);

        var conditionTomorrow = Util.makeElemInner("div",
            "<b>Tomorrow: </b>" + tenDay[1].text +
            " - " +
            "<b>H: </b>" +
            tenDay[1].high +
            " <b>L: </b>" + tenDay[1].low + "<br /><br />");
        conditionTomorrow.className = "wDataTomorrow";
        conditionTomorrow.style.fontSize = ".5em";
        weatherDataDiv.appendChild(conditionTomorrow);

    }

    static getWeatherData() {
        var query = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "')";
        var endpoint = "https://query.yahooapis.com/v1/public/yql?q="
        var request = endpoint + query + "&format=json&u=" + tempType;
        console.log(request);
        $.get(request, function (data) {
            wData = data;
            console.log(data);
            Weather.loadData();
        }, "json");
    }

    static getCity() {
        $.get("https://ipinfo.io", function (response) {
            city = response.city;
            console.log("Got city. " + city);
            console.log("Loading weather data");
            Weather.getWeatherData();
        }, "jsonp");
    }

    static loadWData() {
        Weather.getCity();
    }

    static applyStyles() {
        weatherWin.style.fontFamily = "Calibri, sans-serif";
        weatherWin.style.padding = ".3em";
        weatherWin.style.margin = "0";
        weatherWin.style.textAlign = "center";
        weatherWin.style.backgroundColor = "#5C6BC0";
        weatherWin.style.color = "white";
    }

    static onWReady() {
        console.log("Setting up weather window.");
        weatherWin = getAvailableContainer();
        Weather.loadWData();
        Weather.applyStyles();
    }
}

onloadfuncs.push(Weather.onWReady);
