$(document).ready(function () {
    //make cookie expire in the past
    //logout
    let loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async function(e){
        e.preventDefault();
        const formData = new FormData(loginForm);
        let accountData = {};
        for (var pair of formData.entries()) {
            accountData[pair[0]] = pair[1];
        }
        if(document.getElementById('btnuser')){
          accountData.type = "rider";  
        }else if(document.getElementById('btndriver')){
            accountData.type = "driver";  
        }
        
        let options = {
            method: 'POST',
            headers: {
                accept:'application/json',
                'Content-Type':'application/json',
                
            },
            body: JSON.stringify(accountData), 
        };

        let email = document.getElementById("InputEmail").value;
        let password = document.getElementById("InputPass").value;
        if (email == null || email == "" ||password == null || password == "") {
            alert("Please enter your email or password.");
        }

        let loginresponse = await fetch('/api/login', options);

        if(loginresponse.status && accountData.type == "rider"){
            console.log('User login Success!');
            document.location= '/app-usermap.html';            
        }else if(loginresponse.status && accountData.type == "driver"){
            console.log('Driver login Success!');
            document.location= '/driver-app.html'; 
        }           
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