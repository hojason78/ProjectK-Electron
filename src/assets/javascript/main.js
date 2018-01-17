var onloadfuncs = [];

function addJQ() {
    console.log("Checking for jQuery");
    var hasJQ = false;
    var scriptTags = document.getElementsByTagName("script");
    for (var x = 0; x < scriptTags.length; x++) {
        if (!(scriptTags[x] === undefined || scriptTags[x].src === undefined)) {
            if (scriptTags[x].src.contains("jquery")) {
                console.log("jQuery found");
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

window.onload = () => {
    console.log("Filling in contains method if it doesnt exist");
    if (!String.prototype.contains) {
        String.prototype.contains = function (s) {
            return this.indexOf(s) > -1
        }
    }
    addJQ();
    setTimeout(() => {
        console.log("Running functions");
        var newScript = document.createElement("script");
        newScript.innerHTML = "runFunctions();";
        document.body.appendChild(newScript);
    }, 250);
}

function runFunctions() {
    for (var f = 0; f < onloadfuncs.length; f++) {
        //console.log(onloadfuncs[f]);
        onloadfuncs[f]();
    }
}
