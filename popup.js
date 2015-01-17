$('#registration').submit(function(e) {
	/*$.get('http://mensajay.com/process.php', function(data){
		alert(data);
	});
	*/
	var postData = $(this).serializeArray();
	var formURL = $(this).attr('action');
	
	if (localStorage.getItem('fbUser')) {
        $('#fbusername-input').val(localStorage.getItem('fbUser'));
    } else {
        $('#submit-fail').text('Please open extension on facebook tab.').css('display', 'block');
        e.preventDefault();
		return;
    }
	
	$.ajax({
		url: formURL,
		type: 'POST',
		data: postData,
		success: function(data) {
			alert("SUCCESS: " + data);
		},
		error: function(status) {
			alert("ERROR: " + status);
		}
	});
	e.preventDefault();
});
