/*var currentWidgetNumber = 0;
var available, input;

var currentInput = "";
*/
class Twitter {
    // Variables: available, input, currentInput and currentWidgetNumber
    
    static startTwtTask() {
        setInterval(() => {
            console.log(Twitter.input.value);
            
            var loadinggg = Twitter.available.getElementsByTagName("loading-circle");
            for(var x = 0; x < loadinggg.length; x++) {
                var lod = loadinggg[x];
                lod.parentElement.removeChild(lod);
            }
            
            if (Twitter.currentInput === Twitter.input.value) {
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

        Twitter.available = getAvailableContainer();
        Twitter.available.style.width = "375px";

        Twitter.input = document.createElement("input");
        Twitter.input.className = "new-twitter-user";
        Twitter.input.value = "GoPro";
        Twitter.input.style.height = "1.5em";
        Twitter.input.style.width = "90%";
        Twitter.input.style.overflow = "hidden";
        Twitter.input.style.border = "1px solid #e6ecf0";
        Twitter.input.style.borderRadius = "3px";
        Twitter.input.style.padding = "12px";
        Twitter.input.style.outline = "0";
        Twitter.input.style.maargin = "0";
        Twitter.input.style.fontsize = "14px";
        
        Twitter.input.setAttribute("placeholder", "Twitter user");
        
        Twitter.currentInput = Twitter.input.value;

        Twitter.startTwtTask();
        
        var hr = Util.makeElem("hr");
        Twitter.available.appendChild(Twitter.input);
        Twitter.available.appendChild(hr);
        
        var lineBreak = document.createElement("br");
        Twitter.available.appendChild(lineBreak);
        var twitterEmbed = document.createElement("a");
        twitterEmbed.className = "twitter-timeline";
        twitterEmbed.href = "https://twitter.com/GoPro?ref_src=twsrc%5Etfw";
        twitterEmbed.innerHTML = '<div class="loading-circle"> Loading... </div>';
        Twitter.available.appendChild(twitterEmbed);
        var twitterScript = document.createElement("script");
        twitterScript.setAttribute("src", "https://platform.twitter.com/widgets.js");
        twitterScript.setAttribute("charset", "utf-8");
        twitterScript.setAttribute("async", "");
        console.log("Adding available embed.");
        Twitter.available.appendChild(twitterScript);
        Twitter.available.parentElement.style.overflowY = "scroll";
        Twitter.available.parentElement.style.height = "50vh";
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
        twitterEmbed.innerHTML = '<div class="loading-circle"> Loading tweets for: ' + user + '. \n Check your connection if this takes longer than usual.</div>';
        //console.log(currentTimeline.innerHTML);
        if (currentTimeline === null) {
            Twitter.available.appendChild(twitterEmbed);
        } else {
            currentTimeline.outerHTML = twitterEmbed.outerHTML;
        }
        twttr.widgets.load();
    }
}

onloadfuncs.push(Twitter.startTwitter);