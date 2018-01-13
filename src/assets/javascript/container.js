var currentContainer, clicked;
var highestZI = 0;

function addListenerToAllContainers() {
    console.log("Adding listeners to containers");
    
    var containers = document.getElementsByClassName("container");
    
    //console.log(containers + containers.length);
    
    for(var i = 0; i < containers.length; ++i) {
        console.log("Container " + i);
        var currentCont = containers[i];
        //console.log(currentCont);
        currentCont.style.zIndex = highestZI++;
        currentCont.style.position = "absolute";
        currentCont.style.backgroundColor = "#FFF";
        currentCont.style.marginLeft = "2em";
        currentCont.style.marginTop = "4em";
        currentCont.onmousedown = (omd) => {
            console.log("Click");
            currentContainer = omd.srcElement;
            while (!(currentContainer.className === "container")) {
                currentContainer = currentContainer.parentElement;
            }
            click = true;
            if (omd.srcElement.style.zIndex < highestZI) {
                omd.srcElement.style.zIndex = highestZI++;
            }
        }
    }
}

function initContainers() {
    // Here lies my code
    document.onmousemove = (omm) => {
        if (document.selection) {
            document.selection.empty();
        } else if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        //console.log(omm.clientY);
        //console.log(omm.clientX);
        if (clicked = true && currentContainer != null) {
            console.log(clicked + currentContainer);
            //currentContainer.style.transform = "translate(" + omm.clientX + "px, " + omm.clientY + "px)";
            var l = omm.clientX - (currentContainer.clientWidth / 2);
            var t = omm.clientY - (currentContainer.clientHeight / 2);
            //console.log("debug " + l + " " + t);
            //console.log("+ " + omm.clientX + " " + omm.clientY);
            //console.log("++ " + currentContainer.clientWidth + " " + currentContainer.clientHeight);
            currentContainer.style.marginLeft = (l) + "px";
            currentContainer.style.marginTop = (t) + "px";
        }
    }

    document.onmouseup = (event) => {
        console.log("Clack");
        currentContainer = null;
        click = false;
    }

    addListenerToAllContainers();
    
}

onloadfuncs.push(initContainers);