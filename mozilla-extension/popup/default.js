function start() {
    browser.tabs.query({active: true, currentWindow: true})
    .then(tabs => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "click_first_name",
        });
    });
}

/**
* There was an error executing the script.
* Display the popup's error message, and hide the normal UI.
*/
function report_execute_script_error(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute content script: ${error.message}`);
}

/**
* When the popup loads, inject a content script into the active tab,
* and add a click handler.
* If we couldn't inject the script, handle the error.
*/
browser.tabs.executeScript({file: "/content_script.js"})
.then(start)
.catch(report_execute_script_error);
