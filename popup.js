$('#registration').submit(function(e) {
    alert(localStorage.getItem('fbUser'));
    if (localStorage.getItem('fbUser')) {
        $('#fbusername-input').val(localStorage.getItem('fbUser'));
    } else {
        $('#submit-fail').text('Please open extension on facebook tab.').css('display', 'block');
        e.preventDefault();
    }
});
