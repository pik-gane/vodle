/*
TODO:
- ask to click first option name.
- after first click, highlight option name, say "so the first option is ...", allow "back / try again".
- ask to click last option name.
- after second click, check that length of path matches, else error message. 
- highlight all found options, say "so the last option is ...", allow "back / try again" or "ok".
- ask to click last option description or allow to "skip", highlight all found descriptions
- if name or option contains a unique link, use that as url
- otherwise ask to click last option link or allow to "skip"
- summarize, allow to "set up vodle poll" or "cancel" or "back / try again"
- open vodle in new tab
*/

(function() {
 
    function getDomPath(el) {
        if (!el) {
          return;
        }
        var stack = [];
        var isShadow = false;
        while (el.parentNode != null) {
          // console.log(el.nodeName);
          var sibCount = 0;
          var sibIndex = 0;
          // get sibling indexes
          for ( var i = 0; i < el.parentNode.childNodes.length; i++ ) {
            var sib = el.parentNode.childNodes[i];
            if ( sib.nodeName == el.nodeName ) {
              if ( sib === el ) {
                sibIndex = sibCount;
              }
              sibCount++;
            }
          }
          var nodeName = el.nodeName.toLowerCase();
          if (el.className) {
            nodeName += "." + el.className.trim().replace(/  /g, ' ').replace(/ /g, '.');
          }
          if (isShadow) {
            nodeName += "::shadow";
            isShadow = false;
          }
          if ( sibCount > 1 ) {
            stack.unshift(nodeName + ':nth-of-type(' + (sibIndex + 1) + ')');
          } else {
            stack.unshift(nodeName);
          }
          el = el.parentNode;
          if (el.nodeType === 11) {
            isShadow = true;
            el = el.host;
          }
        }
        stack.splice(0,1); // removes the html element
        return stack;
      }

    function start() {
        window.vodle_stage = 0;
        wait_for_click();
    }

    function wait_for_click() {
        let old_blanket = document.getElementById("vodle_blanket");
        if (old_blanket) {
            blanket.remove();
        }
        let blanket = document.createElement("div"),
            s = blanket.style,
            b = document.body;
        blanket.id = "vodle_blanket";
        s.zIndex = 10000; // on top of everything
        s.position = "absolute";
        s.left = "0px";
        s.top = "0px";
        s.width = "100%";
        s.height = "" + Math.max(b.scrollHeight, b.clientHeight, b.clientHeight, window.innerHeight) + "px";
        s.backgroundColor = "#aaf5";
        document.body.appendChild(blanket);
        document.addEventListener("click", clicked);
    }

    function clicked(ev) {
        document.removeEventListener("click", clicked);
        let blanket = document.getElementById("vodle_blanket");
        blanket.remove();
        let x = ev.clientX, 
            y = ev.clientY,
            el = document.elementFromPoint(x, y);
        console.log("vodle button: document clicked at element " + el.outerHTML + " at path " + getDomPath(el).join(" > "));
        switch (window.vodle_stage) {
            case 0:
                window.vodle_first_name_el = el;
                window.vodle_first_name_el_bg = el.style.backgroundColor;
                el.style.backgroundColor = "#ff0";
                window.vodle_stage++;
                wait_for_click();
                break;
            case 1:
                window.vodle_last_name_el = el;
                find_options();
                break;
        }
    }

    function find_options() {
        // find common ancestor:
        let path1 = getDomPath(window.vodle_first_name_el),
            path2 = getDomPath(window.vodle_last_name_el),
            entries = [];
        for (let pos in path1) {
            if (pos >= path2.length) {
                break;
            } else if (path1[pos] != path2[pos]) {
                entries.push("*");
            } else {
                entries.push(path1[pos]);
            }
        }
        let selector = entries.join(" > ");
        console.log("selector: " + selector);
        let matches = document.querySelectorAll(selector),
            option_els = [],
            in_range = false;
        for (let el of matches) {
            if (el == window.vodle_first_name_el) {
                in_range = true;
            }
            if (in_range) {
                option_els.push(el);
                // TODO: save bg
                el.style.backgroundColor = "#ff0";
                console.log("found option name " + el.textContent.trim());
            }
            if (el == window.vodle_last_name_el) {
                break;
            }
        }
    }

    /**
     * Listen for messages from the background script.
     */
    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "click_first_name") {
            start();
        } 
    });
  
})();
  