//Old Description Box
var content
//New Description Box
var badcontent
//Show More Button
var showMoreButton
//Show Less button
var showLessButton

function start() {
    //Set Vars
    
    //document.readyState is equal to complete before the entire page loads what an oversight
    RepeatUntilLoaded(document.querySelector("ytd-expander.ytd-video-secondary-info-renderer") == null, function(){
        content = document.querySelector("ytd-expander.ytd-video-secondary-info-renderer")
    })
    
    badcontent = document.querySelector('ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-structured-description"]')
    
    if (badcontent != null){
        badcontent.remove();
    }
    
    document.querySelectorAll("#more").forEach(function(element){
        if (element.querySelectorAll(".more-button").length != 0) {
            showMoreButton = element
            console.log(element)        
        }
    })
    

    document.querySelectorAll("#less").forEach(function(element){
        if (element.querySelectorAll(".less-button").length != 0) {
            showLessButton = element            
        }
    })

    //If the badcontent is null then you should already have the old description
    

    //Set Events
    showMoreButton.addEventListener("click", More)
    //showLessButoon.addEventListener("click", Less)
}

function More() {
    content.removeAttribute("collapsed")
}

// Showless button stil actualy adds the collapsed atribute
// If I had to guess it is because they dont expect the showless button to show so they didnt remove the functionality in case the description is expanded

// function Less() {
//     content.setAttribute("collapsed", "")
// }


function RepeatUntilLoaded(bool, callback) {
    if(bool) {
       window.setTimeout(RepeatUntilLoaded(bool, callback), 1000) /* this checks the page every 100 milliseconds */
    } else {
        callback()
    }
}
//need to wait for document.readyState not to know when page is loaded but if I dont the RepeateUnitlLoaded will reach Maximum Stack Call Size
function checkReadyState() {
    if(document.readyState != "complete") {
       window.setTimeout(checkReadyState, 1000) /* this checks the page every 100 milliseconds */
    } else {
        start()
    }
}
checkReadyState();