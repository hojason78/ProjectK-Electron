/*
 * This script checks if electron is being used.
 */

var remote, ipcRenderer;

try {
    remote = require('electron').remote;
    var ipcRenderer = require('electron').ipcRenderer;
} catch(err) { console.log(err.message) }

function trueReady() {
    ipcRenderer.send('run-program', 'cmd.exe');
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
    /*window.onmouseover = (e) => {
        var target = e.target || e.srcElement;
        console.log(target.tagName);
        if(target.tagName === "HTML") {
            console.log("Yes");
            ipcRenderer.send('window-not-background-unclick', "true");
        } else {
            console.log("No");
        }
    }*/
}

function onReady() {
    if (ipcRenderer === null || ipcRenderer === undefined) {
        console.log("ipcRenderer not found. This session is most likely NOT a electron instance");
    } else {
        console.log("ipcRenderer found. Ready.");
        trueReady();
    }
}

window.onload = () => {
    onReady();
}
