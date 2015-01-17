$('#registration').submit(function(e) {
	console.log(e);
    if (localStorage.getItem('fbUser')) {
        $('#fbusername-input').val(localStorage.getItem('fbUser'));
    } else {
        $('#submit-fail').text('Please open extension on facebook tab.').css('display', 'block');
        e.preventDefault();
    }
});
