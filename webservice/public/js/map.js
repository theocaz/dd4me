mapboxgl.accessToken =
    'pk.eyJ1IjoidGhlb2NheiIsImEiOiJja2EyaXBudm4wNzVwM2Vtc2JyYWdxbzR2In0.RTa6vNKcqbOV9W9dOmybew';
var map;
let position = {};
var autoGetCams = false;
let RLC;
let closecam;
let markers = [];
let posMarker = new mapboxgl.Marker();
let camMarkers = [];
var popup = new mapboxgl.Popup({ offset: 25 }).setText();
var dirControl;

window.addEventListener('load', async() => {
    if (!mapboxgl.supported()) {
        alert('Your browser does not support Mapbox GL, please try a different browser or call us for assistance.');
    } else {
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/theocaz/ckajvxmxp0pu01iqyslscwxkf',
            center: [-75.765, 45.4553],
            zoom: 16
        });
    }
    dirControl = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            profile: 'mapbox/driving-traffic',
            flyTo: {
                bearing: 0,
                // These options control the flight curve, making it move
                // slowly and zoom out almost completely before starting
                // to pan.
                speed: 0.2, // make the flying slow
                curve: 1, // change the speed at which it zooms out
                // This can be any easing function: it takes a number between
                // 0 and 1 and returns another number between 0 and 1.
                easing: function (t) {
                    return t;
                }
            }
        });
    console.log("dir control" +dirControl);
    map.addControl(dirControl, 'top-left');

    
    let response = await fetch('/api/getdirections', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify( {
            profile: 'mapbox/driving',
            coords: [[-75.76551, 45.45808],[- 75.75243, 45.45951]],
            steps: true
        })
    });
    console.log("resp" + response);


    // map.addControl(new mapboxgl.NavigationControl());

    var canvas = map.getCanvasContainer();

    // map.addControl(new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    //     countries: 'ca',
    //     marker: {    
    //         color: 'orange'
    //     },
    //     flyTo: {
    //         bearing: 0,
    //         // These options control the flight curve, making it move
    //         // slowly and zoom out almost completely before starting
    //         // to pan.
    //         speed: 0.2, // make the flying slow
    //         curve: 1, // change the speed at which it zooms out
    //         // This can be any easing function: it takes a number between
    //         // 0 and 1 and returns another number between 0 and 1.
    //         easing: function (t) {
    //             return t;
    //         }
    //     },
    //     mapboxgl: mapboxgl
    // }));

    


    // document.getElementById('btnAutoPos').onclick = function () {
    //     getPosition();
    // };

    var geojson = {
        type: 'FeatureCollection',
        features: [{}]
    };
    // add markers to map
    // geojson.features.forEach(function (marker) {

    //     // create a HTML element for each feature
    //     var el = document.createElement('div');
    //     el.className = 'marker';

    //     // make a marker for each feature and add to the map
    //     new mapboxgl.Marker(el)
    //         .setLngLat(marker.geometry.coordinates)
    //         .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    //         .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
    //         .addTo(map);
    // });

    
    // document.getElementById('btnClosestAuto').onclick = function () {
    //     autoGetCams = !autoGetCams;
    //     if (autoGetCams) {
    //         document.getElementById('btnClosestAuto').innerText = "Auto on";
    //     } else {
    //         document.getElementById('btnClosestAuto').innerText = "Auto off";
    //     }

    //     getClosest();
    //     console.log(autoGetCams);
    // }

    // document.getElementById('btnClosest').onclick = function () {
    //     getClosest();
    // };


    // document.getElementById("btnSbm").addEventListener('click', function () {
    //     let latID = document.getElementById('latID').value;
    //     let lngID = document.getElementById('lngID').value;

    //     console.log(latID);
    //     setPosition(latID, lngID);

    // });

    // document.getElementById('btnClear').onclick = function () {
    //     //go thru every marker and remove it
    //     markers.forEach(marker => {
    //         marker.remove();
    //     })
    //     setPosition(); //set new position
    //     console.log("after clear " + markers);

    // };
    
    var start = [-75.765, 45.4553];
    
    // function getRoute(customStart, end) {
    //     // make a directions request using cycling profile
    //     // an arbitrary start will always be the same
    //     // only the end or destination will change
    //     var start = [-75.765, 45.4553];
    //     var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

    //     // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    //     var req = new XMLHttpRequest();
    //     req.open('GET', url, true);
    //     req.onload = function () {
    //         var json = JSON.parse(req.response);
    //         var data = json.routes[0];
    //         var route = data.geometry.coordinates;
    //         var geojson = {
    //             type: 'Feature',
    //             properties: {},
    //             geometry: {
    //                 type: 'LineString',
    //                 coordinates: route
    //             }
    //         };
    //         // if the route already exists on the map, reset it using setData
    //         if (map.getSource('route')) {
    //             map.getSource('route').setData(geojson);
    //         } else { // otherwise, make a new request
    //             map.addLayer({
    //                 id: 'route',
    //                 type: 'line',
    //                 source: {
    //                     type: 'geojson',
    //                     data: {
    //                         type: 'Feature',
    //                         properties: {},
    //                         geometry: {
    //                             type: 'LineString',
    //                             coordinates: geojson
    //                         }
    //                     }
    //                 },
    //                 layout: {
    //                     'line-join': 'round',
    //                     'line-cap': 'round'
    //                 },
    //                 paint: {
    //                     'line-color': '#3887be',
    //                     'line-width': 5,
    //                     'line-opacity': 0.75
    //                 }
    //             });
    //         }
    //         // add turn instructions here at the end
    //     };
    //     req.send();
    // }
    // map.on('load', function () {
    //     // make an initial directions request that
    //     // starts and ends at the same location
    //     getRoute(start);

    //     // Add starting point to the map
    //     map.addLayer({
    //         id: 'point',
    //         type: 'circle',
    //         source: {
    //             type: 'geojson',
    //             data: {
    //                 type: 'FeatureCollection',
    //                 features: [{
    //                     type: 'Feature',
    //                     properties: {},
    //                     geometry: {
    //                         type: 'Point',
    //                         coordinates: start
    //                     }
    //                 }
    //                 ]
    //             }
    //         },
    //         paint: {
    //             'circle-radius': 10,
    //             'circle-color': '#3887be'
    //         }
    //     });
    //     // this is where the code from the next step will go
    // });
    
    // map.on('click', function (e) {
    //     var coordsObj = e.lngLat;
    //     canvas.style.cursor = '';
    //     var coords = Object.keys(coordsObj).map(function (key) {
    //         return coordsObj[key];
    //     });
    //     var end = {
    //         type: 'FeatureCollection',
    //         features: [{
    //             type: 'Feature',
    //             properties: {},
    //             geometry: {
    //                 type: 'Point',
    //                 coordinates: coords
    //             }
    //         }
    //         ]
    //     };
    //     if (map.getLayer('end')) {
    //         map.getSource('end').setData(end);
    //     } else {
    //         map.addLayer({
    //             id: 'end',
    //             type: 'circle',
    //             source: {
    //                 type: 'geojson',
    //                 data: {
    //                     type: 'FeatureCollection',
    //                     features: [{
    //                         type: 'Feature',
    //                         properties: {},
    //                         geometry: {
    //                             type: 'Point',
    //                             coordinates: coords
    //                         }
    //                     }]
    //                 }
    //             },
    //             paint: {
    //                 'circle-radius': 10,
    //                 'circle-color': '#f30'
    //             }
    //         });
    //     }
    //     getRoute(coords);
    // });
    








    //set current position
    let setPosition = (lat, lng) => {
        position = { lat: lat, lng: lng };
        // display coordinates:
        // if (lat, lng) {
        //     document.getElementById("currentPosLat").textContent = "Latitude: " + lat;
        //     document.getElementById("currentPosLng").innerHTML = "Longitude: " + lng;
        // } else {
        //     document.getElementById("currentPosLat").innerHTML = "Latitude: ";
        //     document.getElementById("currentPosLng").innerHTML = "Longitude: ";
        // }
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
    //get user's current position
    let getPosition = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    //console.log(pos);
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
    getPosition();

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




    let backupGeoLocate = async () => {
        let res = await fetch('http://127.0.0.1:9000/geo');
        let data = await res.json();
        console.log(data);
        setPosition(data.latitude, data.longitude, 1)
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

});