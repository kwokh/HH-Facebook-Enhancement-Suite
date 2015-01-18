var access_token = 'CAACEdEose0cBAM1NZCTwthZAT7L1oZBVvY0RaG6JISwIj7K4k8TT3Qo8PyZAZAQDRd8SJ9Piw3r7OHxGg7bMCx9wXtdUVq3f5cU8xSQWaCZCg42lhuTUan1c0ljQ1I4owDSnRQspcDKkKWtTHt5d6CtehDUwV7siyaQxUIEohRWQoTl7HxdEGYHkTWJg8Ed1nKQeqqUa6WqNpsfvjTVyRc';
$(document).ready(function() {
	var likeList = JSON.parse(localStorage.getItem('likedLinks'));
	$likes = $('#likes');
	console.log(likeList);

	for(var i = 0; i < likeList.length; i++) {
		getMessageData(likeList[i], function(data) {
			$likes.append('<a href=\"https://facebook.com/' + data.id + '\"><p>' + data.message + '</p></a>');
		});
	}
});

function getMessageData(messageId, callback) {
	$.getJSON('https://graph.facebook.com/v2.2/' + messageId + '?fields=message&access_token=' + access_token, function(data) {
		callback(data);
	});
}