// ==UserScript==
// @name         Old Fashion Description
// @namespace    http://tampermonkey.net/
// @homepage     https://github.com/RyanSzczepanski/Old-Fashion-Description
// @version      0.2
// @description  Revert YouTube's description change.
// @author       RyanSzczepanski & BowDown097
// @match        *://*.youtube.com/*
// @match        *://*.youtu.be/*
// @exclude      *://www.youtube.com/c/*
// @exclude      *://www.youtube.com/channel/*
// @exclude      *://www.youtube.com/user/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// ==/UserScript==

var description, showMoreButton;

function waitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });
        observer.observe(document, {
            childList: true,
            subtree: true
        });
    });
}

function setupButtons() {
    if (window.location.href.indexOf("watch?") == -1) {
        return;
    }

    // More Button
    waitForElement('tp-yt-paper-button[id="more"]').then(function(elm) {
        showMoreButton = elm;
        showMoreButton.addEventListener("click", () => description.removeAttribute("collapsed"));
    });

    // New Description
    waitForElement('ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-structured-description"]').then(function(elm) {
        if (elm != null) {
            elm.remove();
            elm.style.visibility = "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN"; // patch for removing the new description on newer versions of the website
        }
    });

    // Old Description
    waitForElement('ytd-expander.ytd-video-secondary-info-renderer').then((elm) => { description = elm });
}

(function() {
    'use strict';
    window.addEventListener("yt-page-data-updated", setupButtons, true);
})();