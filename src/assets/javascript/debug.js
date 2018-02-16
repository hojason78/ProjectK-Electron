    var debugWindow, debug, debugTogglePresses;
    class Debug {
        static startDebug() {
            console.log("Setting up debug window...");
            debugWindow = getAvailableContainer();
            var title = document.createElement("a");
            title.innerHTML = "Debug Window";
            var split = document.createElement("br");
            var scriptInput = document.createElement("textarea");
            var scriptOutput = document.createElement("textarea");
            $(scriptInput).bind('input propertychange', () => {
                console.log(scriptInput.value);
                var evalResult = "";
                try {
                    evalResult = eval(scriptInput.value);
                } catch (e) {
                    evalResult += e;
                }
                scriptOutput.value = evalResult;
            });
            debugWindow.appendChild(title);
            debugWindow.appendChild(split);
            debugWindow.appendChild(scriptInput);
            debugWindow.appendChild(scriptOutput);
        }
        static enableDebug() {
            onloadfuncs.push(Debug.startDebug);
        }

        static listenForClicks() {
            debugTogglePresses += 1;
        }

        static enableListenForDebugKeys() {
            setInterval(() => {
                if (debugTogglePresses >= 7) {
                    Debug.startDebug();
                }
                debugTogglePresses = 0;
            }, 3000);
            onclickfuncs.push(Debug.listenForClicks);
        }
    }
    onloadfuncs.push(Debug.enableListenForDebugKeys);
