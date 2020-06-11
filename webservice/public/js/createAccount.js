$(document).ready(function () {

var myForm = document.getElementById("createAccountForm");
myForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(myForm);
    let accountData = {};
    for (var pair of formData.entries()) {
        accountData[pair[0]] = pair[1];
    }


    fetch('/api/createAccount', {
        method: 'post',
        body: JSON.stringify(formData)
    })
});

});



