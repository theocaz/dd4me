window.onload = () => {

    console.log('Cookies UserApp: '+document.cookie);
    let allcookies = document.cookie;
    let array = allcookies.split(';');
    
    for(let i=0; i<array.length; i++){
        if(array[i].split('=')[0] == " name"){
            let valueName = array[i].split('=')[1];
            document.getElementById("username").innerHTML = valueName;
        }else if(array[i].split('=')[0] == " last"){
            let valueLast = array[i].split('=')[1];
            document.getElementById("userlast").innerHTML = valueLast;
        }else if(array[i].split('=')[0] == " email"){
            let valueEmail = array[i].split('=')[1];
            document.getElementById("useremail").innerHTML = valueEmail;
        }else if(array[i].split('=')[0] == " phone"){
            let valuePhone = array[i].split('=')[1];
            document.getElementById("userphone").innerHTML = valuePhone;
        }
    }
    
    };

$(document).ready(function(){
    document.getElementById('btn').addEventListener('click',async function(ev){
        let formele = document.getElementById('tripform');
        let tripform = new FormData(formele);
        let tripdata = {};
        for (const [key, val] of tripform.entries()) {
            console.log('val and key: '+val,key);
            tripdata[key]=val;
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                accept:'application/json',
            },
            body: JSON.stringify(tripdata), 
        };

        let result = await fetch ('/pay', options);
        let resultJson = await result.json();
        console.log('resultJSON: '+resultJson);



    });
});
