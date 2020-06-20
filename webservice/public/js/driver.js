
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
        let response = await fetch('/api/shiftmanager', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ onShift, shiftType })
        });
        //check if response stauts is ok then update
        
        
    });

    onShiftFunc = async function(){
        while(onShift == true){
            //look for team
        
        }
        while(inTeam == true){
            //look for trips
        }
    }

});