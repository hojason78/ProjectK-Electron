var currentContainer, clicked, highestZI;

window.onload = () => {
    function addListenerToAllContainers() {
        var containers = document.getElementsByClassName("container");
        
        for(var i = 0; i < containers.length; ++i) {
            var currentCont = containers[i];
            currentCont.style.zIndex = i + 1;
            currentCont.style.position = "absolute";
            currentCont.style.backgroundColor = "#FFF";
            currentCont.onmousedown = (omd) => {
                console.log("Click");
                currentContainer = omd.srcElement;
                click = true;
                var elements = document.body.getElementsByTagName("*");
                for(var z = 0; z < elements.length; ++z) {
                    console.log("called");
                    if(elements[z].style.zIndex === undefined) {
                        console.log("undefined out")
                        return;
                    }
                    if(elements[z].style.zIndex > highestZI) {
                        highestZI = elements[z].styles.zIndex;
                        console.log("Found new highest z-index " + highestZI);
                    }
                    console.log("no conditions met.")
                }
                omd.srcElement.style.zIndex = ++highestZI;
            }
        }
        
        document.onmousemove = (omm) => {
            console.log(omm.clientY);
            console.log(omm.clientX);
            if(clicked = true && currentContainer != null) {
                console.log("Test " + omm.srcElement.tagName);
                /*if(omm.srcElement.tagName != "DIV") {
                    console.log("Nope.");
                    console.log(omm.srcElement.tagName);
                    return;
                }*/
                //currentContainer.style.transform = "translate(" + omm.clientX + "px, " + omm.clientY + "px)";
                currentContainer.style.marginLeft = (omm.clientX - 50) + "px";
                currentContainer.style.marginTop = (omm.clientY - 50) + "px";
            }
        }
        
        document.onmouseup = (event) => {
            console.log("Clack");
            currentContainer = null;
            click = false;
        }
    }
    addListenerToAllContainers();
} 