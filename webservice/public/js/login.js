$(document).ready(function () {
    //make cookie expire in the past
    //logout
    logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('onclick', async function (e) {
        document.cookie = 'email' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
        document.cookie = 'ph' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';

    });
});