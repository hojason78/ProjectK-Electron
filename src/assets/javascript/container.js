var currentContainer, clicked;
var highestZI = 0;

var allContainers;

function addListenerToAllContainers() {
    console.log("Adding listeners to containers");

    var containers = document.getElementsByClassName("container");

    //console.log(containers + containers.length);

    for (var i = 0; i < containers.length; ++i) {
        console.log("Container " + i);
        var currentCont = containers[i];
        //console.log(currentCont);
        currentCont.style.zIndex = highestZI++;
        if (currentCont.style.position !== "absolute") {
            currentCont.style.position = "absolute";
        }
        if (currentCont.style.backgroundColor === "") {
            currentCont.style.backgroundColor = "#FFF";
        }
        if (currentCont.style.marginLeft === "" || currentCont.marginTop === "") {
            console.log("Undefined margins");
            currentCont.style.marginLeft = "2em";
            currentCont.style.marginTop = (4 + (currentCont.style.height == "") ? ((highestZI == 1 || highestZI >= 5) ? 4 : highestZI * 6) : currentCont.style.minHeight) + "em";
        }
        currentCont.onmousedown = (omd) => {
            console.log("Click");
            currentContainer = omd.srcElement;
            /*while (!(currentContainer.className === "container")) {
                currentContainer = currentContainer.parentElement;
            }*/
            if (currentContainer.className === "container" || currentContainer.className === "contentContainer") {
                while (!(currentContainer.className === "container")) {
                    currentContainer = currentContainer.parentElement;
                }
            }
            click = true;
            if (parseInt(omd.srcElement.style.zIndex) < highestZI) {
                omd.srcElement.style.zIndex = highestZI++;
            }
        }
        if (currentCont.children.length > 0) {
            continue;
        }
        var containerInContainer = document.createElement("div");
        console.log("Adding container");
        containerInContainer.className = "contentContainer";
        currentCont.appendChild(containerInContainer);
    }
    allContainers = document.getElementsByClassName("contentContainer");
}

function initContainers() {
    // Here lies my code
    document.onmousemove = (omm) => {
        //console.log(omm.clientY);
        //console.log(omm.clientX);
        if (clicked = true && currentContainer != null) {
            console.log(clicked + currentContainer);
            //currentContainer.style.transform = "translate(" + omm.clientX + "px, " + omm.clientY + "px)";
            //Working
            var l = omm.clientX - (currentContainer.clientWidth / 2);
            var t = omm.clientY - 10;
            //Working
            //console.log("debug " + l + " " + t);
            //console.log("+ " + omm.clientX + " " + omm.clientY);
            //console.log("++ " + currentContainer.clientWidth + " " + currentContainer.clientHeight);
            if (currentContainer.className === "container" || currentContainer.className === "contentContainer") {
                currentContainer.style.marginLeft = (l) + "px";
                currentContainer.style.marginTop = (t) + "px";
                if (document.selection) {
                    document.selection.empty();
                } else if (window.getSelection) {
                    window.getSelection().removeAllRanges();
                }
            }
        }
    }

    document.onmouseup = (event) => {
        console.log("Clack");
        currentContainer = null;
        click = false;
    }

    addListenerToAllContainers();

}

function getAvailableContainer() {
    allContainers = document.getElementsByClassName("contentContainer");
    for (var x = 0; x < allContainers.length; x++) {
        if (allContainers[x].innerHTML === "") {
            return allContainers[x];
        } else if ((x + 1) === allContainers.length) {
            var canvas = document.getElementsByClassName("canvas")[0];
            var newDiv = document.createElement("div");
            newDiv.className = "container";
            canvas.appendChild(newDiv);
            var newDivTwo = document.createElement("div");
            newDivTwo.className = "contentContainer";
            newDiv.appendChild(newDivTwo);
            addListenerToAllContainers();
            return newDivTwo;
        } else {
            continue;
        }
    }
}

function test() {
    var canvas = document.getElementsByClassName("canvas")[0];
    var newDiv = document.createElement("div");
    newDiv.className = "container";
    canvas.appendChild(newDiv);
    var newDivTwo = document.createElement("div");
    newDivTwo.className = "contentContainer";
    newDiv.appendChild(newDivTwo);
    addListenerToAllContainers();
}

onloadfuncs.push(initContainers);
