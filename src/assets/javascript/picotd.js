class PicOfTheDay {
    static start() {
        PicOfTheDay.win = getAvailableContainer();
        setInterval(() => {
            console.log("GOOOOOOOOOOOOOOOOOOO");
            PicOfTheDay.win.innerHTML = "";
            setTimeout(() => {
                PicOfTheDay.refresh();
            }, 10);
        }, 15000);
        PicOfTheDay.refresh();
    }
    
    static refresh() {
        var v1 = Util.makeElem("img");
        v1.setAttribute("src", "https://source.unsplash.com/random");
        v1.setAttribute("height", "150px");
        v1.style.pointerEvents = "none";
        v1.style.margin = ".5em";
        PicOfTheDay.win.appendChild(v1);
    }
}

onloadfuncs.push(PicOfTheDay.start);