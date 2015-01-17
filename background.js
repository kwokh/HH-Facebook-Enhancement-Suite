chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(request);
	localStorage.setItem('fbUser', request.user);
});