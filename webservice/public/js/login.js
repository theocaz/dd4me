$(document).ready(function () {
    //make cookie expire in the past
    //logout
    var loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async function(e){
        e.preventDefault();
        const formData = new FormData(loginForm);
        let accountData = {};
        for (var pair of formData.entries()) {
            accountData[pair[0]] = pair[1];
        }
        let response = await fetch('/api/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accountData)
        });
    });

    logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', async function (e) {
        let response = await fetch('/api/logout', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }});
        if(response){
            console.log('logged out');
        }
    
    });
});