var window;

function startDebug() {
  console.log("Setting up debug window...");
  window = getAvailableContainer();
  var scriptInput = document.createElement("textarea");
  var scriptOutput = document.createElement("textarea");
  $(scriptInput).bind('input propertychange', () => {
    console.log(scriptInput.value);
    var evalResult = eval(scriptInput.value);
    scriptOutput.value = evalResult;
  }
  window.appendChild(scriptInput);
  window.appendChild(scriptOutput);
}

onloadfuncs.push(startDebug);
