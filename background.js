chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.user) { localStorage.setItem('fbUser', request.user); 
		sendResponse({abc: 'lololol'});
	}
    if (request.username) {
        $.getJSON('http://mensajay.com/fetch.php?fbusername=' + request.username, function(data) {
        	console.log(data);
            sendResponse({json: data});
        });
    }
});

chrome.alarms.create('updateUserList', {
    delayInMinutes: 0,
    periodInMinutes: 0.1
});

// alarm listeners
chrome.alarms.onAlarm.addListener(function(alarm) {
    // add if loggedin
    if (alarm.name === 'updateUserList') {
        $.getJSON('http://mensajay.com/fetch.php?fbusername=*', function(data) {
            localStorage.setItem('userList', JSON.stringify(data));
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    userList: data
                });
            });
        });
    }
});
