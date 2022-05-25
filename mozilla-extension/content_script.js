(function() {
 
    function clicked(ev) {
        document.removeEventListener("click", clicked);
        console.log("vodle button: document clicked");
        let blanket = document.getElementById("vodle_blanket");
        blanket.remove();
        let x = ev.clientX, 
            y = ev.clientY,
            el = document.elementFromPoint(x, y);
        console.log(el.outerHTML);
    }

    /**
     * Wait for a click on the first option name
     * and parse the click
     */
    function click_first_name() {
        let blanket = document.createElement("div"),
            s = blanket.style;
        blanket.id = "vodle_blanket";
        s.zIndex = 10000; // on top of everything
        s.position = "absolute";
        s.left = "0px";
        s.top = "0px";
        s.width = "100%";
        s.height = "" + document.body.scrollHeight + "px"; // "100%";
        s.backgroundColor = "#aaf5";
        document.body.appendChild(blanket);
        document.addEventListener("click", clicked);
    }

    /**
     * Listen for messages from the background script.
     */
    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "click_first_name") {
            click_first_name();
        } 
    });
  
})();
  