var currentWidgetNumber = 0;
var available, input;

var currentInput = "";

function startTwtTask() {
    setInterval(() => {
        console.log(input.value);
        
        if(currentInput === input.value) {
            return;
        }
        
        currentInput = input.value;
        
        var p = document.querySelectorAll("[class*=twitter-widget-]");
        for(var i = 0; i < p.length; i++) {
            console.log(p);
            p.parentElement.removeChild(p);
        }
        updateTimeline(input.value);
    }, 5000);
}

function startTwitter() {
    console.log("Getting a available container");
    available = getAvailableContainer();
    available.style.width = "300px";
    // var
    input = document.createElement("textarea");
    input.className = "new-twitter-user";
    input.value = "GoPro";
    input.style.height = "1em";
    input.style.resize = "none";
    input.style.overflow = "hidden";
    currentInput = input.value;
    startTwtTask();
    available.appendChild(input);
    var lineBreak = document.createElement("br");
    available.appendChild(lineBreak);
    var twitterEmbed = document.createElement("a");
    twitterEmbed.className = "twitter-timeline";
    twitterEmbed.href = "https://twitter.com/GoPro?ref_src=twsrc%5Etfw";
    twitterEmbed.innerHTML = "Tweets by GoPro";
    available.appendChild(twitterEmbed);
    var twitterScript = document.createElement("script");
    twitterScript.setAttribute("src", "https://platform.twitter.com/widgets.js");
    twitterScript.setAttribute("charset", "utf-8");
    twitterScript.setAttribute("async", "");
    console.log("Adding available embed.");
    available.appendChild(twitterScript);
    available.parentElement.style.overflowY = "scroll";
    available.parentElement.style.height = "50vh";
}

function updateTimeline(user) {
    var other = document.getElementsByClassName("twitter-timeline");
    for (var x = 0; x < other.length; x++) {
        other[x].remove();
    }
    var all = document.getElementsByTagName("");

    if (user === "") {
        user = "empty";
    }
    var userURL = "https://twitter.com/" + user + "?ref_src=twsrc%5Etfw";
    var currentTimeline = document.getElementById("twitter-widget-" + currentWidgetNumber++);
    var twitterEmbed = document.createElement("a");
    twitterEmbed.className = "twitter-timeline";
    twitterEmbed.href = userURL;
    twitterEmbed.innerHTML = "Tweets by " + user;
    //console.log(currentTimeline.innerHTML);
    if (currentTimeline === null) {
        available.appendChild(twitterEmbed);
    } else {
        currentTimeline.outerHTML = twitterEmbed.outerHTML;
    }
    twttr.widgets.load();
}

onloadfuncs.push(startTwitter);
