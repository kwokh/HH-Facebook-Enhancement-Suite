var access_token = 'CAACEdEose0cBAA0yJG2rIZC9csSGdPVd1xNIZCZBDQCpz60RDLeEsy6Qswoj6enpZCNWOpNoI36ADH1Ylnczx1iZCuUcju2BfA6NeZA5pZAL69qCSjRdnAuzLZAmbI2Q5JIDVyetgm2ZBY1n6WZBJFtZBYaj5ZBNmughPgihZAvDkK3ZCqZBF5OfWJRdhhrGiZBxvYvDlLUa3GU13v3E9aSX2y8js7UhHpdFIY6NmGsZD';
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
	$.getJSON('https://graph.facebook.com/' + messageId + '?fields=message&access_token=' + access_token, function(data) {
		callback(data);
	});
}