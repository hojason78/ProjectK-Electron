var debugWindow, debug;

function startDebug() {
  console.log("Setting up debug window...");
  debugWindow = getAvailableContainer();
  var title = document.createElement("a");
  title.innerHTML = "Debug Window";
  var split = document.createElement("br");
  var scriptInput = document.createElement("textarea");
  var scriptOutput = document.createElement("textarea");
  $(scriptInput).bind('input propertychange', () => {
    console.log(scriptInput.value);
    var evalResult = eval(scriptInput.value);
    scriptOutput.value = evalResult;
  });
  debugWindow.appendChild(title);
  debugWindow.appendChild(split);
  debugWindow.appendChild(scriptInput);
  debugWindow.appendChild(scriptOutput);
}

onloadfuncs.push(startDebug);
