chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	alert('lll');
	console.log(request);
	localStorage.setItem('fbUser', request.user);
});