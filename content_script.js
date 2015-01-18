// content_script.js is loaded after the page is loaded, so jquery can be used.

var fadeTimer;
// Scrap the user ID from the Facebook banner
$(document).ready(function() {

    var $popoverDiv = $('<div class="addon-popover"><p id="addon-github"></p><p id="addon-linkedin"></p><p id="addon-tagline"></p></div>');

    $('body').append($popoverDiv);

    $popoverDiv.hover(function() {
        clearTimeout(fadeTimer);
    }, function() {
    	$popoverDiv.fadeOut(200);
    });


    if (!localStorage.getItem('fbUser')) {

        var fbUser = $("a[title='Profile']").attr('href');

        fbUser = fbUser.substring(fbUser.lastIndexOf('/') + 1);
        localStorage.setItem('fbUser', fbUser);

        // set extension localStorage in sync with page localStorage
        chrome.runtime.sendMessage({
            user: fbUser
        });
    }
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.userList) localStorage.setItem('userList', JSON.stringify(request.userList));
    });

    removeDataHoverCards();


});

function getUserByUsername(username, callback) {
    // keys: firstName, lastName, linkedin, github, tagline, facebookID
    //console.log('inside get user by username');
    var port = chrome.runtime.connect({
        name: "mainport"
    });
    port.postMessage({
        username: username
    });

    port.onMessage.addListener(function(response) {
        callback(response.json);
    });


    // chrome.runtime.sendMessage({
    // 	username: username
    // }, function(response) {
    // 	console.log('does this happen');
    // 	callback(response.json);
    // 	console.log('no callback occurred')
    // });
}

function removeDataHoverCards() {

    var $dataHoverCards = $("a[data-hovercard][href^='https://www.facebook.com/']");

    $dataHoverCards.hover(function(e) {

        var username = $(this).attr('href');
        var indexOfQuestionMark = username.indexOf('?');

        if (indexOfQuestionMark === -1) username = username.substring(username.lastIndexOf('/') + 1);
        else username = username.substring(username.lastIndexOf('/') + 1, indexOfQuestionMark);
        console.log(username);

        if (isUserExistInList(username)) {

            getUserByUsername(username, function(data) {
                console.log(data);
                $('#addon-github').text(data.github);
                $('#addon-linkedin').text(data.linkedIn);
                $('#addon-tagline').text(data.tagline);
                $('.addon-popover').css('display', 'block');
            })
        }
    }, function(e) {
        fadeTimer = setTimeout(function() {
            $addonPopover = $('.addon-popover');
            if (!$addonPopover.is(':hover')) $addonPopover.fadeOut(200);
        }, 3000);
    });
    // // $(dataHoverCards[i]).attr('id', 'hovercard-basic');

    // // Bootstrap popover fix
    // $(dataHoverCards[i]).attr('data-content', 'Popover with data-trigger');
    // $(dataHoverCards[i]).attr('rel', 'popover');
    // $(dataHoverCards[i]).attr('data-placement', 'bottom');
    // $(dataHoverCards[i]).attr('data-original-title', 'Title');
    // $(dataHoverCards[i]).attr('data-trigger', "hover");
    // $(dataHoverCards[i]).attr('data-toggle', 'popover');
    // //$(dataHoverCards[i]).attr("selector", "body", "padding": 0);
    // // $(dataHoverCards[i]).css({
    // // 	"overflow" : "visible"
    // // });
    // $("[data-toggle=popover]").popover({
    // 	template: '<div class="popover special-class"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
    // });

    // $('.popover').css({'left': '0px'});

    // // End Bootstrap popover fix




    // $(dataHoverCards[i]).hovercard({
    //           detailsHTML: 'hoverHTMLBasic',

    //           cardImgSrc: 'http://ejohn.org/files/short.sm.jpg'
    //       });


    // return fbUser = fbUser.substring(fbUser.lastIndexOf('/') + 1);
}


function saveLikedPosts() {
    var likeLinks = $('.UFILikeLink');
    likeLinks.click(function() {

    });
}

// bad function
function isUserExistInList(username) {
    var list = JSON.parse(localStorage.getItem('userList'));
    console.log(list);
    for (var i = 0; i < list.length; i++) {
        if (username === list[i]) return true;
    }
    return false;
}

// 1. Contact background.js to GET all facebook user's from server and store in map/list in content script
// 2. target w/ jquery data-hovercard's and for each fbid's on the page, find the list/map's matching values
//    if a match happens then remove their fb hovercard and replace/add with jquery hovercard label class (see test-hovercard.html)



// Prepare the hover card with the FBES user's information 
// $(document).ready(function() {
//     var hoverHTMLText = ''; //TODO replace with FBES user's information from callback to background.js


//     // extra parameters found here: http://designwithpc.com/plugins/hovercard
//     var $demoBasic = $('#demo-basic');

//     if ($demoBasic.length()) {
//         $demoBasic.hovercard({
//             detailsHTML: hoverHTMLText,
//             width: 400,
//         });
//     }

// });
