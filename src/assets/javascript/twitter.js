var currentWidgetNumber = 0;
var available, input;

var currentInput = "";

class Twitter {
    static startTwtTask() {
        setInterval(() => {
            console.log(input.value);

            if (currentInput === input.value) {
                return;
            }

            currentInput = input.value;

            var p = document.querySelectorAll("[class*=twitter-widget-]");
            for (var i = 0; i < p.length; i++) {
                console.log(p);
                p.parentElement.removeChild(p);
            }
            Twitter.updateTimeline(input.value);
        }, 1000);
    }

    static startTwitter() {
        console.log("[TWT]Getting a available container");

        available = getAvailableContainer();
        available.style.width = "300px";

        input = document.createElement("textarea");
        input.className = "new-twitter-user";
        input.value = "GoPro";
        input.style.height = "1em";
        input.style.resize = "none";
        input.style.overflow = "hidden";

        currentInput = input.value;

        Twitter.startTwtTask();

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

    static updateTimeline(user) {
        var other = document.getElementsByClassName("twitter-timeline");
        for (var x = 0; x < other.length; x++) { other[x].remove(); }
        var all = document.getElementsByTagName("");

        if (user === "") { user = "empty"; }
        
        var userURL = "https://twitter.com/" + user + "?ref_src=twsrc%5Etfw";

        var currentTimeline = document.getElementById("twitter-widget-" + currentWidgetNumber++);

        var twitterEmbed = document.createElement("a");
        twitterEmbed.className = "twitter-timeline";
        twitterEmbed.href = userURL;
        twitterEmbed.innerHTML = "Loading tweets for: " + user + ". \n Check your connection if this takes longer than usual.";
        //console.log(currentTimeline.innerHTML);
        if (currentTimeline === null) {
            available.appendChild(twitterEmbed);
        } else {
            currentTimeline.outerHTML = twitterEmbed.outerHTML;
        }
        twttr.widgets.load();
    }
}

onloadfuncs.push(Twitter.startTwitter);
