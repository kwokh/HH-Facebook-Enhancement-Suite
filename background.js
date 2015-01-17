chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    localStorage.setItem('fbUser', request.user);
});

chrome.alarms.create('updateUserList', {
    delayInMinutes: 0,
    periodInMinutes: 5
});

// alarm listeners
chrome.alarms.onAlarm.addListener(function(alarm) {
    // add if loggedin
    if (alarm.name === 'updateUserList') {
        $.getJSON('http://mensajay.com/fetch.php?fbusername=*', function(data) {
            localStorage.setItem('userList', data);
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
