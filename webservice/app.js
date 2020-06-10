const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 9000;
//import customer.js as an obj
//var customer = require('customer.js'); not correct yet


//client has location - manually choses where they are going
//server does request to mapbox
//send back to client
//fetch requests every ~5 sec to check if ride was accepted
//database ride selected feature - driver accepts it and client gets feedback somehow


app.use(cors());
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(express.json());

app.get('/geo/', async(req,res) =>{
	let ip = req.ip;
	if(req.ip === ':::1' || req.ip === '::ffff:127.0.0.1'){
		ip ='45.44.230.61';
	}
	let geocode = axios.get('https://tools.keycdn.com/geo.json?host=' +ip);
	console.log(geocode.data.data);
	res.json(geocode.data.data.geo);
});

app.listen(port, () => {
	console.log(`listening on port: ${port}`);
});
app.get('/signup', (req, res) => {
	console.log(req);
	res.send(req);
})
app.get('/', (req, res) => res.send('Hello World!')); 
app.get('/about', (req, res) => res.send('About')); 
app.get('/about/sample', (req, res) => res.send('Sample About'));

app.get('/redlightcam/', async(req, res) =>{
	let rlc = await axios.get('https://services.arcgis.com/G6F8XLCl5KtAlZ2G/arcgis/rest/services/Red_Light_Camera_Violations_2019/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json');
	//res.contentType('text/html');
	//res.send(rlc.data);
	res.json(rlc.data);
});

app.get('/rideRequest/', async(req, res) => { //get variables
	let startAddress;
	let endAddress;
	//multiple address dropoffs possible solution : loop to add however many there are?
	//-----------------------------------------

	//let customer = new Customer; //new customer obj?

	var calcRoute = function(){
		console.log("in calcRoute");
	}

	var sendRequestToDriver = function(){
		//----
		console.log("in send request to driver");

		//if accepted- makeNewRoute
		//else - send to other driverp
	}; //function
	//calcRoute();
	res.send("ride request");
});



