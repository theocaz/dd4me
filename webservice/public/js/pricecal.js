$(document).ready(function(){
    document.getElementById('btn2').addEventListener('click',function(ev){
        let formele = document.getElementById('tripform');
        let tripform = new FormData(formele);
        console.log(formele);
        let tripdata = {};
        for (const [key, val] of tripform.entries()) {
            console.log(val,key);
            tripdata[key]=val;
            
        };

        console.log(tripdata);



    });
});