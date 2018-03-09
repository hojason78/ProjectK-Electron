/*
 * This script checks if electron is being used.
 */

var remote, ipcRenderer;

try {
    remote = require('electron').remote;
    var ipcRenderer = require('electron').ipcRenderer;
} catch(err) { console.log(err.message + ", electron not detected, clickthrough functionality disabled.") }

function trueReady() {
    //ipcRenderer.send('run-program', 'cmd.exe');
    ipcRenderer.send('toggle-clickthrough', 'false');
    /*window.addEventListener("mouseenter", (e) => {
        var target = e.target || e.srcElement;
        console.log(target.tagName);
        if (target.tagName === "HTML") {
            console.log("Yes");
            ipcRenderer.send('toggle-clickthrough', "");
        } else {
            console.log("No");
        }
    });*/
    /*window.onmousemove = (e) => {
        var target = e.target || e.srcElement;
        console.log(target.tagName);
        if(target.tagName === "HTML" || target.tagName === "BODY") {
            console.log("Yes");
            ipcRenderer.send('window-not-background-unclick', "true");
        } else {
            console.log("No");
        }
    }*/
    setInterval(() => {
        ipcRenderer.send("toggle-clickthrough", "false");
        var elementOvers = document.querySelectorAll(":hover");
        var elementOver = elementOvers[elementOvers.length-1];
        if(elementOver === undefined) return;
        console.log(elementOver.tagName);
        if(elementOver.tagName == "HTML" || elementOver.tagName == "BODY") {
            //console.log("YES!");
            ipcRenderer.send("toggle-clickthrough", "true");
        }
    }, 100);
}

function onReady() {
    if (ipcRenderer === null || ipcRenderer === undefined) {
        console.log("ipcRenderer not found. This session is most likely NOT a electron instance");
    } else {
        console.log("ipcRenderer found. Ready.");
        trueReady();
    }
}

function start() {
    setTimeout(() => {
        console.log("Alright loading up..");
        onReady();
        console.log("Working....");
    }, 1000);
}

onloadfuncs.push(start);
