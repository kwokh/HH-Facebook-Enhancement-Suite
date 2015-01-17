// content_script.js is loaded after the page is loaded, so jquery can be used.


// Scrap the user ID from the Facebook banner
$(document).ready(function() {
    if (!localStorage.getItem('fbUser')) {
        var fbUser = $("a[title='Profile']").attr('href');
        fbUser = fbUser.substring(fbUser.lastIndexOf('/') + 1);
        localStorage.setItem('fbUser', fbUser);

        // set extension localStorage in sync with page localStorage
        chrome.runtime.sendMessage({
            user: fbUser
        });
    }
    removeDataHoverCards();
});

function removeDataHoverCards(){
	var attributes = $('a');
	var dataHoverCards = $("a[data-hovercard][href^='https://www.facebook.com/']");
	console.log(dataHoverCards);
	for(var i = 0; i < dataHoverCards.length; i++){
		console.log ( dataHoverCards[i] );
		// $(dataHoverCards[i]).attr('name', 'value'); <label id="demo-basic">John Resig</label>
		//$(dataHoverCards[i]).removeAttr('data-hovercard');
		//$(dataHoverCards[i]).attr('id', 'hovercard-basic');
		/*$('#hovercard-basic').parent().css({
			'overflow' : 'visible'
		});*/
		$(dataHoverCards[i]).hovercard({
            detailsHTML: 'hoverHTMLBasic',
            width: 1000,
            height: 1000,
            cardImgSrc: 'http://ejohn.org/files/short.sm.jpg'
        });

	}
	// return fbUser = fbUser.substring(fbUser.lastIndexOf('/') + 1);
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
