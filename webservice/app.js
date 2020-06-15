const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 9000;
const bodyParser = require('body-parser');
const User = require('./model/user');
const db = require('./dbConn/db');
const login = require("./middleware/login");
let accessToken =
	'pk.eyJ1IjoidGhlb2NheiIsImEiOiJja2EyaXBudm4wNzVwM2Vtc2JyYWdxbzR2In0.RTa6vNKcqbOV9W9dOmybew';

//Stripe public a secret keys
let Public_Key = process.env.PUBLICKEY;
let Secret_Key = 'sk_test_qZSvHS1T0dhkLg9lkI2Juiw200KGZPLFPu';//process.env.SECRETKEY;

const stripe = require('stripe')(Secret_Key);
//import customer.js as an obj


//client has location - manually choses where they are going
//server does request to mapbox
//send back to client
//fetch requests every ~5 sec to check if ride was accepted
//database ride selected feature - driver accepts it and client gets feedback somehow

app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(login);
app.use('/',express.static(path.join(__dirname, 'public')));

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
app.use(cookieParser());
app.use(express.json());

app.post('/api/getdirections', async (req, res) => {
	//console.log(req);
	let data = req.body;
	console.log(data.coords)
	let profile = data.profile;
	let coords = data.coords;
	let formatCoords;
	for(let i=0;i<coords.length;i++){
		formatCoords[i] = coords[i][0];
		//formatCoords[i][1] = coords[i][1];
		//formatCoords[i][3] = ";";
	};
	console.log(formatCoords);
	//console.log(data);
	let directions = await axios.post('https://api.mapbox.com/directions/v5/' + profile + '?access_token=' + accessToken,{
		'Content-Type: application/x-www-form-urlencoded',
		'coordinates=': coords
		
		 
	});
	//figure out how to include content type 
	///{api_name}/5/mapbox/{profile}?access_token={your_access_token} HTTP/1.0
	//
	//
	console.log(directions);
	//res.send(directions);
});


app.get('/geo/', async(req,res) =>{
	let ip = req.ip;
	if(req.ip === ':::1' || req.ip === '::ffff:127.0.0.1'){
		ip ='45.44.230.61';
	}
	let geocode = axios.get('https://tools.keycdn.com/geo.json?host=' +ip);
	console.log(geocode.data.data);
	res.json(geocode.data.data.geo);
});


app.get('/signup', (req, res) => {
	console.log(req);
	res.send(req);
})


app.get('/about', (req, res) => res.send('About')); 


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
		console.log("in send request to driver func");

		//if accepted- makeNewRoute
		//else - send to other driverp
	}; //function
	//calcRoute();
	res.send("ride request");
});

app.post(('/api/logout/', async(req,res)=>{
	document.cookie = 'email' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
	document.cookie = 'ph' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
	res.send('hello');
}))

app.post(('/api/login/', async(req, res)=>{

	res.json(req.user);
}));
app.post('/api/createAccount/', async(req, res) => {
	let data = req.body;
	console.log(data);
	let user = {
		email: data.email,
		pass: data.password,
		fname: data.fname,
		lname: data.lname,
		phone: data.phone,
	};
	console.log(user);
	let userResult = await User.createUser(user);
	if(userResult.status){

		let loginResult = await User.loginUserWithPass(user.email, user.pass);
		if(loginResult.status){
			res.cookie('email', user.email, {maxAge:1000 *60 *60 *24});
			res.cookie('ph', loginResult.cookieHash, { maxAge: 1000 * 60 * 60 * 24});
		}

	}else{
		//did not work
	}
	res.json(user);
	//send to db
});

//Stripe Payment Module


app.post('/payment', (req,res) =>{
   
    stripe.customers.create({         
            email: req.body.stripeEmail,
            name:req.body.stripeBillingName,
            card: req.body.stripeToken,    
          })
          .then((customer) =>{
            return stripe.charges.create({
              amount:1055,
              description: "Driver Ride",
              currency: "cad",
              customer: customer.id
            });
          })
          .then((charge) => {
            res.render('payment');
            console.log(charge);
          })
          .catch((err) => {
              res.send(err)
              console.log("Stripe Error:", err);
          });
    
});

app.listen(port, () => {
	db.init();
	console.log(`listening on port: ${port}`);
});


