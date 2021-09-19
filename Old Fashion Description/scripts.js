//This is the old description box
const content = document.querySelectorAll("#content.ytd-expander")[1];
//This is the new description box
const badcontent = document.querySelector('ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-structured-description"]');

function start() {
    badcontent.remove();
    content.classList.add('compact')
}

function More(event) {
    event.preventDefault();
    content.classList.remove('compact')
    content.classList.add('expanded')
}

function Less(event) {
    event.preventDefault();
    content.classList.add('compact')
    content.classList.remove('expanded')
}

document.querySelectorAll("#more")[1].addEventListener("click", More)
document.querySelectorAll("#less")[1].addEventListener("click", Less)

start()