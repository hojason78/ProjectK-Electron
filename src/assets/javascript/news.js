class News {
    static startup() {
        News.window = getAvailableContainer();
        News.setUpWindow();
        $.get("https://projectk-api.herokuapp.com/?url=https%3A%2F%2Fnews.google.com%2Fnews%2Frss%2F%3Fned%3Dus%26gl%3DUS%26hl%3Den", function (response) {
            News.cr = response;
            News.crp = $.parseXML(News.cr.toString());
            News.displayResults(response);
        });
    }

    static setUpWindow() {
        var w = News.window;
        w.style.height = "15em";
        w.style.width = "20em";
        w.style.fontFamily = "Calibri";
        w.style.fontSize = ".7em";
        w.style.overflowY = "scroll";
        w.style.border = "none";
        w.style.margin = ".5em";
        var wp = News.window.parentElement;
        wp.style.backgroundColor = "rgb(37, 37, 37)";
        wp.style.borderColor = "orange";
        wp.style.borderRadius = "3px";
    }

    static applyAStyle(e) {
        e.style.color = "white";
        e.style.width = "80%";
    }

    static applyDStyle(e) {
        e.style.lineHeight = "1.5em";
        e.style.height = "3em";
        e.style.overflow = "hidden";
        e.style.textOverflow = "ellipsis";
        if(News.eo === undefined || News.eo === null) News.eo = true;
        if(News.eo) { e.style.backgroundColor = "rgba(119, 170, 119, 0.67)"; } else { e.style.backgroundColor = "rgba(119, 170, 119, 1)"; }
        News.eo = !News.eo;
        e.style.width = "96%";
        
        e.style.paddingLeft = ".25em";
        e.style.paddingRight = ".25em";
        e.style.paddingBottom = ".5em";
    }

    static displayResults(response) {
        News.window.innerHTML = "";
        var t = Util.makeElemInner("h2", "News");
        t.style.margin = 0; t.style.color = "white"; t.style.pointerEvents = "none";
        News.window.appendChild(t);
        
        $(News.crp).find("item").each(function () {
            var e = $(this);
            console.log("---");
            console.log(e.find("title").text() + " @ " + e.find("link").text());

            var d = Util.makeElem("div");
            d.setAttribute("class", "news-entry");

            var a = Util.makeElem("a");
            a.setAttribute("href", e.find("link").text());
            a.innerHTML = e.find("title").text().substr(0, 48) + "...";
            News.applyAStyle(a);
            d.appendChild(a);
            var p = Util.makeElemInner("span", "&nbsp;&nbsp;&nbsp;" + e.find("pubDate").text().substr(0, 10)); p.style.color = "white"; p.style.fontSize = ".5em";
            d.appendChild(p);
            var br = Util.makeElem("br");
            d.appendChild(br);

            News.applyDStyle(d);
            News.window.appendChild(d);
        });

        /*
        $(response).find("item").each(function () {
            var e = $(this);
            console.log("---");
            console.log(e.find("title").text() + " @ " + e.find("link").text());
            
            var a = Util.makeElem("a");
            a.setAttribute("href", e.find("link").text()); a.innerHTML = e.find("title").text(); News.window.appendChild(a);
            var br = Util.makeElem("br"); News.window.appendChild(br);
        });*/
    }
}

onloadfuncs.push(News.startup);
