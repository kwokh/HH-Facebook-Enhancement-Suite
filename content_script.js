// content_script.js is loaded after the page is loaded, so jquery can be used.


// Scrap the user ID from the Facebook banner
$(document).ready(function() {
    if (!localStorage.getItem('fbUser')) {
        var fbUser = $("a[title='Profile']").attr('href');
        fbUser = fbUser.substring(fbUser.lastIndexOf('/') + 1);
        localStorage.setItem('fbUser', fbUser);
    }
});



// Store all users from the current facebook.com/groups HH page 
// & possibly use background.js callbacks to query the database for hovercards to create.
// & remove all facebook hover cards, replacing them with our own jquery hovercards if they are a match
