$(document).ready(function () {
    //make cookie expire in the past
    //logout
    var loginForm = document.getElementById('driverLogin');
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = new FormData(loginForm);
        let accountData = {};
        for (var pair of formData.entries()) {
            accountData[pair[0]] = pair[1];
        }
        accountData.type = "driver";
        accountData.test = true;
        let response = await fetch('/api/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(accountData)
        });
    });

});