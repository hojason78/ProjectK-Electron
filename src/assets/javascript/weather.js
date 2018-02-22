var weatherWin,
    weatherDataDiv,
    city = "",
    latlong = "",
    woeid = "";

var tempType = "f";

var wData, randPicture;

class Weather {
    static e(w) {
        w = w + "";
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


        weatherDataDiv = Util.makeElem("div");
        weatherDataDiv.className = "wData";
        weatherDataDiv.style.pointerEvents = "none";
        weatherWin.appendChild(weatherDataDiv);
        
        // Location
        var var1 = Util.makeElemInner("h4", "Unknown")
        var1.style.fontSize = "14px";
        var1.style.margin = "0";
        var1.style.marginTop = "1em";
        var1.className = "wLocation";
        weatherDataDiv.appendChild(var1);

        // Image
        var wImg = Util.makeElem("div");
        wImg.style.height = "3em";
        wImg.className = "wImage";
        weatherDataDiv.appendChild(wImg);
        
        wImg.appendChild(Util.getLoadingCircle(""));
        
        // Today's weather div
        var wTodayDiv = Util.makeElem("div");
        wTodayDiv.className = "wDataToday";
        wTodayDiv.style.fontSize = ".70em";
        weatherDataDiv.appendChild(wTodayDiv);

        // TW Summary
        var wTSum = Util.makeElemInner("p", "Loading...");
        wTSum.className = "wDataToday-sum";
        wTodayDiv.appendChild(wTSum);

        //End Today's weather div

        var wTomDiv = Util.makeElem("div");
        wTomDiv.className = "wDataTom";
        wTomDiv.style.fontSize = ".5em";
        weatherDataDiv.appendChild(wTomDiv);

        var wTomDivSum = Util.makeElemInner("p", "Loading tomorrow's");
        wTomDivSum.className = "wDataTom-sum";
        wTomDiv.appendChild(wTomDivSum);

        // Tomorrow's weather div


        // End tomorrows

        var var2 = Util.makeElemInner("a", "Powered by Yahoo!");
        var2.className = "wSource";
        var2.href = "https://www.yahoo.com";
        var2.style.fontSize = "6px";
        weatherWin.appendChild(var2);
        var2.style.color = "white";
        Weather.applyStyles();
    }

    static loadData() {
        var tenDay = wData.query.results.channel.item.forecast;
        var cond = wData.query.results.channel.item.condition;

        var wLocation = weatherDataDiv.getElementsByClassName("wLocation")[0];
        wLocation.innerHTML = wData.query.results.channel.location.city;

        var wImg = weatherDataDiv.getElementsByClassName("wImage")[0];
        wImg.innerHTML = "";
        var wIcon = Util.makeElem("img");
        var wCode = cond.code;
        wIcon.src = "http://l.yimg.com/a/i/us/we/52/" + wCode + ".gif";//Weather.e(cond);
        wIcon.style.height = "3em";
        wIcon.style.filter = "hue-rotate(50deg)";
        wImg.appendChild(wIcon);

        var condition = weatherDataDiv.getElementsByClassName("wDataToday-sum")[0];
        condition.innerHTML = cond.text +
            " - " +
            cond.temp + "&deg; " + tempType.toUpperCase() +
            "" + "<br />" +
            "<b>High: </b>" +
            tenDay[0].high +
            " <b>Low: </b>" + tenDay[0].low;

        console.log("tom");
        
        var conditionTomorrow = weatherDataDiv.getElementsByClassName("wDataTom-sum")[0];
        conditionTomorrow.innerHTML = "<b>Tomorrow: </b>" + tenDay[1].text +
            " - " +
            "<b>H: </b>" +
            tenDay[1].high +
            " <b>L: </b>" + tenDay[1].low;
    }

    static getWeatherData() {
        var query = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "')";
        var endpoint = "https://query.yahooapis.com/v1/public/yql?q="
        var request = endpoint + query + "&format=json&u=" + tempType;
        console.log(request);
        $.get(request, function (data) {
            wData = data;
            console.log(data);
            Weather.setUpWWindow();
            setTimeout(() => {
                Weather.loadData();
            }, 100);
        }, "json");
    }

    static getCity() {
        try {
            $.get("https://ipinfo.io", function (response) {
                city = response.city;
                console.log("Got city. " + city);
                console.log("Loading weather data");
                Weather.getWeatherData();
            }, "jsonp");
        } catch (e) {
            console.log("Fallback to another service");
            $.get("https://freegeoip.net/json", function (response) {
                city = response.city;
                console.log("[FB] Got city. " + city);
                console.log("[FB] Loading weather data");
                Weather.getWeatherData();
            });
        }
    }

    static loadWData() {
        Weather.getCity();
    }

    static applyStyles() {
        weatherWin.style.fontFamily = "Calibri, sans-serif";
        weatherWin.style.padding = ".3em";
        weatherWin.style.margin = "0";
        weatherWin.style.textAlign = "center";
        //weatherWin.style.backgroundColor = "#53CBFF";
        Weather.loadRandomPicture();
        weatherWin.style.backgroundAttachment = "fixed";
        weatherWin.style.backgroundPosition = "center";
        weatherWin.style.animation = "slide 400s linear infinite";
        weatherWin.style.color = "white";
        weatherWin.style.width = "10em";
        weatherWin.style.height = "11em";
        weatherWin.style.border = "none";
    }

    /*static detectAndLoad() {
        var v1 = document.getElementsByTagName("head")[0];
        var scripts = v1.getElementsByTagName("link");
        if (scripts.length > 0) {
            for (var x = 0; x  < scripts.length; x++) {
                if (scripts[x].getAttribute("href").contains("Material+Icons")) {
                    console.log("Found Material Icon loaded.")
                    return;
                }
            }
        }
        var v2 = Util.makeElem("link");
        v2.setAttribute("href", "https://fonts.googleapis.com/icon?family=Material+Icons");
        v2.setAttribute("rel", "stylesheet");
        v1.appendChild(v2);
        console.log("Loaded Material Icons");
    }*/
    
    static loadRandomPicture() {
        weatherWin.style.backgroundImage = 'url("https://source.unsplash.com/random")';
        // Temporary until I get unsplash api worked out
        
        /*$.get("https://source.unsplash.com/random", function(response) {
            randPicture = response;
            var pic = response.url.raw;
            weatherWin.style.backgroundImage = 'url("' + pic + '")';
        }, "jsonp");*/
    }

    static onWReady() {
        //console.log("Loading weather icons");
        //Weather.detectAndLoad();
        console.log("Setting up weather window.");
        weatherWin = getAvailableContainer();
        Weather.loadWData();
    }
}

onloadfuncs.push(Weather.onWReady);
