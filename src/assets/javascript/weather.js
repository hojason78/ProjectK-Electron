var weatherWin, 
    city = "",
    weathertemp = "";

function setUpWWindow() {
    var var1 = makeElem("h4");
    var1.innerHTML = "Weather in " + city;
    weatherWin.appendChild(var1);
    //getWeatherData(city);
    var var2 = makeElem("a");
    var2.href = "https://www.metaweather.com/api/";
    var2.innerHTML = "Weather information provided by MetaWeather";
    var2.style.fontSize = "6px";
    weatherWin.appendChild(var2);
}

function getCity() {
    $.get("http://ipinfo.io", function (response) {
        city = response.city;
        console.log("Got city. " + city);
        setUpWWindow();
    }, "jsonp");
}

function getWeatherData() {
    var woeid = "";
    $.get("https://metweather.com/api/location/search/?query=" + city, r => {
        woeid = r.woeid;
        $.get("https://metaweather.com/api/location/" + woeid + "/", re => {
           console.log(re.weather_state_name);
        });
    }, "json")
}

function onWReady() {
    console.log("Setting up weather window.");
    weatherWin = getAvailableContainer();
    getCity();
}

function makeElem(s) {
    return document.createElement(s);
}

onloadfuncs.push(onWReady);
