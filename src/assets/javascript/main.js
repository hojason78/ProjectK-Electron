/* Assists with the problem of multiple functions for any event */
/* Load listener functions */
var onloadfuncs = [];
/* Click functions click/unclick */
var onclickfuncs = [];
/* Mouse moves */
var onmousefuncs = [];

function addJQ() {
    console.log("Checking for jQuery");
    var hasJQ = false;
    var scriptTags = document.getElementsByTagName("script");
    for (var x = 0; x < scriptTags.length; x++) {
        if (!(scriptTags[x] === undefined || scriptTags[x].src === undefined)) {
            if (scriptTags[x].src.contains("jquery")) {
                console.log("jQuery found!");
                hasJQ = true;
                break;
            }
        }
    }
    if (!hasJQ) {
        console.log("jQuery not found... adding it.")
        var headE = document.getElementsByTagName("head")[0];
        var jQScript = document.createElement("script");
        jQScript.type = "text/javascript";
        jQScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js";
        headE.appendChild(jQScript);
        console.log("Added jQuery.");
    }
}

function runLoads() {
    for (var f = 0; f < onloadfuncs.length; f++) { onloadfuncs[f](); }
}

function runClicks(e) {
    for (var f = 0; f < onclickfuncs.length; f++) { onclickfuncs[f](e); }
}

function polyMissingAndInit() {
    console.log("Detecting polyfillables and filling if not found");
    if (!String.prototype.contains) {
        String.prototype.contains = function (s) { return this.indexOf(s) > -1; }
    }
    addJQ();
}

/*
* Start events
*/

window.onload = () => {
    setTimeout(runLoads(), 0);
}

window.onclick = (e) => {
    setTimeout(runClicks(e), 0);
}

/*
* End events
*/

polyMissingAndInit();
