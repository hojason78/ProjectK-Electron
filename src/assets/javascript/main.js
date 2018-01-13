var onloadfuncs = [];

window.onload = () => {
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
