var access_token = 'CAACEdEose0cBAD49dt1Fn4C3f968au59xUhKem3BJIpZCTLf04GlfdYZB12qvZB9XbJUoySu9z3mEBN0auNwrDJRrLhsT36EGX3ed98v15nCi9ELkp8uRiivikkgtT08ZABdTC5MFQxACuf6PXLbtqoF4vw0SyM1J2KbJXG0ZCEPl0Q4tliXKm6khZAVaUWwKsZB1FgBxQSBApwJ8oENdA2';
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