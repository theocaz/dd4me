$(document).ready(function () {

    var myForm = document.getElementById("createAccountForm");
    myForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = new FormData(myForm);
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
    
        let accresponse = await fetch('/api/createAccount', options);
        if(accresponse.status && accountData.type == "rider"){
            console.log('User Account Created!');
            document.location= '../html/app-usermap.html';           
        }else if(accresponse.status && accountData.type == "driver"){
            console.log('Driver Account Created!');
            document.location= '../html/driver-app.html'; 
        } 

    
        //response check
        //document.location('index.html');
    }).catch(err => { console.log(err) });
    
        
    
    });