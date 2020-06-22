const state = {};
$(document).ready(function () {
    var onShift = false;
    var shiftType;
    var shiftTypeInfo;
    var onShiftToggle = document.getElementById('onShiftToggle');
    onShiftToggle.addEventListener('click', async function () {
        primaryCheck = document.getElementById('primaryDriverID').checked;
        secondaryCheck = document.getElementById('secondaryDriverID').checked;

        if (onShift == false && (primaryCheck || secondaryCheck)){
            onShift = true;
            if(primaryCheck && secondaryCheck){
                shiftType = "both";
                shiftTypeInfo = " both"
            }else if (primaryCheck) {
                shiftType = "primary";
                shiftTypeInfo = " primary ";
            }else if (secondaryCheck) {
                shiftType = "secondary";
                shiftTypeInfo = " secondary "
            }
            
           
           document.getElementById('onShiftDisplay').innerText = "On shift as " + shiftTypeInfo;


        }else if(primaryCheck == false && secondaryCheck == false){
            alert("please select driver role");

        }else if(onShift == true){
            onShift = false;
            document.getElementById('onShiftDisplay').innerText = "Off shift";

        }
        const location = await getLocation();
        console.log(location.coords.latitude);
        let response = await fetch('/api/shiftmanager', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ onShift, shiftType, locationLat: location.coords.latitude, locationLng : location.coords.longitude })
        });
        //check if response stauts is ok then update
        
        
    });


    getLocation = function(){
        return new Promise((resolve, reject) => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            }
            else{
                reject("location is needed for the app to work");
            }

        });
    };
    

});