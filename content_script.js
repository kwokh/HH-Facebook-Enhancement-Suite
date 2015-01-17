$(document).ready(function() {
    if (!localStorage.getItem('fbUser')) {
        var fbUser = $("a[title='Profile']").attr('href');
        fbUser = fbUser.substring(fbUser.lastIndexOf('/') + 1);
        localStorage.setItem('fbUser', fbUser);
    }
});
