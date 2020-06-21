$(document).ready(function(){
    document.getElementById('buttontest').addEventListener('click',async function(ev){
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

        let result = await fetch ('/money', options);
        let resultJson = await result.json();
        console.log('resultJSON: '+resultJson);



    });
});