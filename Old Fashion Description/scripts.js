//Old Description Box
var content
//New Description Box
var badcontent
//Show More Button
var showMoreButton
//Show Less button
var showLessButton

var collapsed;

function checkReadyState() {
    if(document.readyState != "complete") {
       window.setTimeout(checkReadyState, 1000) /* this checks the page every 100 milliseconds */
    } else {
        start()
    }
}
checkReadyState();

function start() {
    //Set Vars
    
    waitForEl('ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-structured-description"]')
    .then(() => {
        badcontent = document.querySelector('ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-structured-description"]')

        if (badcontent != null){
            badcontent.remove()
        }
    })

    //document.readyState is equal to complete before the entire page loads what an oversight
    waitForEl('ytd-expander.ytd-video-secondary-info-renderer')
    .then(() => {
        content = document.querySelector('ytd-expander.ytd-video-secondary-info-renderer')
	if (!collapsed){
            More();
	}
    });
    
    document.querySelectorAll("#more").forEach(function(element){
        if (element.querySelector(".more-button")) {
            showMoreButton = element
        }
    })
    

    document.querySelectorAll("#less").forEach(function(element){
        if (element.querySelector(".less-button")) {
            showLessButton = element
        }
    })
    
    //Set Events
    showMoreButton.addEventListener("click", More)
    showLessButton.addEventListener("click", Less)
}

function More() {
    collapsed = false;
    content.removeAttribute("collapsed");
}

// Showless button stil actualy adds the collapsed atribute
// If I had to guess it is because they dont expect the showless button to show so they didnt remove the functionality in case the description is expanded

function Less() {
    collapsed = true;
    content.setAttribute("collapsed", "");
}

//Waits for the element to be loaded 
    
function waitForEl(el) {
    return new Promise((resolve, reject) => {
        const intervalId = setInterval(() => {
            if (document.querySelector(el)) {
                clearInterval(intervalId);
                resolve();
            }
        }, 1000);
    });
}
  
//Check for changing video to set elemets agian

var oldHref = document.location.href;

window.onload = function() {

    var bodyList = document.querySelector("body")
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (oldHref != document.location.href) {
                oldHref = document.location.href;
                checkReadyState()
            }
        });
    });
    var config = {
        childList: true,
        subtree: true
    };

    observer.observe(bodyList, config);

};