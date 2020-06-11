$(document).ready(function () {
    fetch('/api/createAccount', {
        cache: 'no-cache',
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify() //user info
    });
});