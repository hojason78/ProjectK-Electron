/* Assists with the problem of multiple functions for any event */
/* Load listener functions */
var onloadfuncs = [];
/* Click functions click/unclick */
var onclickfuncs = [];
/* Mouse moves */
var onmousefuncs = [];

class MainPK {
    static addJQ() {
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

    static runLoads() {
        for (var f = 0; f < onloadfuncs.length; f++) {
            onloadfuncs[f]();
        }
    }

    static runClicks(e) {
        for (var f = 0; f < onclickfuncs.length; f++) {
            onclickfuncs[f](e);
        }
    }

    static runMouseMove(e) {
        for (var f = 0; f < onmousefuncs.length; f++) {
            onmousefuncs[f](e);
        }
    }

    static polyMissingAndInit() {
        console.log("Detecting polyfillables and filling if not found");
        if (!String.prototype.contains) {
            String.prototype.contains = function (s) {
                return this.indexOf(s) > -1;
            }
        }
        MainPK.addJQ();
    }

    static setup() {
        MainPK.polyMissingAndInit();
    }
}

class Util {
    static makeElem(tag) {
        return document.createElement(tag);
    }
    static makeElemInner(tag, inner) {
        var v1 = Util.makeElem(tag);
        v1.innerHTML = inner;
        return v1;
    }
    static setClass(e, c) {
        e.className = c;
    }
    static pushLoad(e) {
        onloadfuncs.push(e);
    }
    static pushMove(e) {
        onmousefuncs.push(e);
    }
    static pushClick(e) {
        onclickfuncs.push(e);
    }
}

/*
 * Start events
 */

window.onload = () => {
    MainPK.setup();
    setTimeout(MainPK.runLoads(), 0);
}

window.onclick = (e) => {
    setTimeout(MainPK.runClicks(e), 0);
}

window.onmousemove = (e) => {
    setTimeout(MainPK.runMouseMove(e), 0);
}

/*
 * End events
 */

MainPK.setup();
