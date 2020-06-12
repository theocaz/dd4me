mapboxgl.accessToken =
    'pk.eyJ1IjoidGhlb2NheiIsImEiOiJja2EyaXBudm4wNzVwM2Vtc2JyYWdxbzR2In0.RTa6vNKcqbOV9W9dOmybew';

var map = null;
let position = {};
var autoGetCams = false;
let RLC;
let closecam;
let markers = [];
let posMarker = new mapboxgl.Marker();
let camMarkers = [];
var popup = new mapboxgl.Popup({ offset: 25 }).setText();

window.addEventListener('load', () => {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/theocaz/ckajvxmxp0pu01iqyslscwxkf',
        center: [-75.765, 45.4553],
        zoom: 16
    });



    document.getElementById('btnAutoPos').onclick = function () {
        getPosition();
    };

    var geojson = {
        type: 'FeatureCollection',
        features: [{}]
    };


    map.on('mousemove', function (e) {
        document.getElementById('info').innerHTML =
            // e.point is the x, y coordinates of the mousemove event relative
            // to the top-left corner of the map
            JSON.stringify(e.point) +
            '<br />' +
            // e.lngLat is the longitude, latitude geographical position of the event
            JSON.stringify(e.lngLat.wrap());
    });

    document.getElementById('btnClosestAuto').onclick = function () {
        autoGetCams = !autoGetCams;
        if (autoGetCams) {
            document.getElementById('btnClosestAuto').innerText = "Auto on";
        } else {
            document.getElementById('btnClosestAuto').innerText = "Auto off";
        }

        getClosest();
        console.log(autoGetCams);
    }

    document.getElementById('btnClosest').onclick = function () {
        getClosest();
    };


    document.getElementById("btnSbm").addEventListener('click', function () {
        let latID = document.getElementById('latID').value;
        let lngID = document.getElementById('lngID').value;

        console.log(latID);
        setPosition(latID, lngID);

    });

    document.getElementById('btnClear').onclick = function () {
        //go thru every marker and remove it
        markers.forEach(marker => {
            marker.remove();
        })
        setPosition(); //set new position
        console.log("after clear " + markers);

    };
    getPosition();
});
//get user's current position
let getPosition = () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                console.log(pos);
                setPosition(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy);
            },
            (err) => {
                console.log(err);
                backupGeoLocate();
            }
        );
    } else {
        backupGeoLocate();
    }

}

let backupGeoLocate = async () => {
    let res = await fetch('http://127.0.0.1:9000/geo');
    let data = await res.json();
    console.log(data);
    setPosition(data.latitude, data.longitude, 1)
};


//set current position
let setPosition = (lat, lng) => {
    position = { lat: lat, lng: lng };
    if (lat, lng) {
        document.getElementById("currentPosLat").textContent = "Latitude: " + lat;
        document.getElementById("currentPosLng").innerHTML = "Longitude: " + lng;
    } else {
        document.getElementById("currentPosLat").innerHTML = "Latitude: ";
        document.getElementById("currentPosLng").innerHTML = "Longitude: ";
    }
    console.log("current position: " + lat + " " + lng);
    map.setCenter([lng, lat]);
    //let zoom = (acc / 300) * 18 + 2;
    //map.setZoom(zoom);
    posMarker.setLngLat([lng, lat]).addTo(map);
    markers.push(posMarker);

    getRedLightCams();

    if (autoGetCams) {
        getClosest();
    };
};

//display the closest cams to the users position
let getClosest = function () {
    let closest = { lat: 0, lng: 0, distance: 1 };
    for (let i = 0; i < RLC.length; i++) {
        let tLat = RLC[i]['attributes']['LATITUDE'];
        let tLng = RLC[i]['attributes']['LONGITUDE'];
        //let latlng = locTags[i].innerHTML.substring(7);
        //latlng = latlng.substring(0, latlng.length - 1).split(' ');

        let d = distance(position.lat, position.lng, tLat, tLng, 'K');
        if (d < closest.distance) {
            closest = {
                lat: tLat,
                lng: tLng,
                distance: d
            }
            //make new marker with red color and set popup text, location, add to map
            markers.push(new mapboxgl.Marker({
                color: "red"
            })
                .setPopup(popup.setHTML(RLC[i]['attributes']['INTERSECTION'] + "<br><strong>" + RLC[i]['attributes']['TOTAL_VIOLATIONS'] + "</strong> CAUGHT THIS YEAR" + "<br>FACING " + RLC[i]['attributes']['CAMERA_FACING'].toUpperCase()))
                .setLngLat([tLng, tLat])
                .addTo(map)
            );
        };
    };

};
//fetch cams
let getRedLightCams = async (lat, lng, dist) => {
    let res = await fetch('http://localhost:9000/redlightcam')
    let doc = await res.json();
    //console.log(doc['features'][0]['attributes']);
    RLC = doc['features'];

    //let locTags = doc.querySelectorAll("geometry");
    //console.log(doc);
};






//https://www.geodatasource.com/developers/javascript
let distance = (lat1, lon1, lat2, lon2, unit) => {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
}
