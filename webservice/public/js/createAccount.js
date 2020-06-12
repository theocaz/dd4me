$(document).ready(function () {

var myForm = document.getElementById("createAccountForm");
myForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(myForm);
    let accountData = {};
    for (var pair of formData.entries()) {
        accountData[pair[0]] = pair[1];
    }

    let response = await fetch('/api/createAccount', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(accountData)
    });

    //response check
    //document.location('index.html.com');
});

    

});



