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
const Trip = require('./model/trip');
const db = require('./dbConn/db');
const login = require("./middleware/login");
let accessToken =
	'pk.eyJ1IjoidGhlb2NheiIsImEiOiJja2EyaXBudm4wNzVwM2Vtc2JyYWdxbzR2In0.RTa6vNKcqbOV9W9dOmybew';

//Stripe public a secret keys
let Public_Key = process.env.PUBLICKEY;
let Secret_Key = 'sk_test_qZSvHS1T0dhkLg9lkI2Juiw200KGZPLFPu';//process.env.SECRETKEY;

app.use(cookieParser());
app.use(express.json());
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



 
// NOT IN USE - WILL REDIRECT TO GOOGLE MAPS FOR STEP BY STEP DIRECTIONS---------------------------

// app.post('/api/getdirections', async (req, res) => {
// 	//console.log(req);
// 	let data = req.body;
// 	let profile = data.profile;
// 	let coords = data.coords;
// 	let formatCoords = 'coordinates=';
// 	coords.forEach(c => {
// 		formatCoords += c[0] + ", " + c[1] +';'
// 	});
// 	formatCoords = formatCoords.substr(0, formatCoords.length-1);

// 	//'coordinates=-117.17282, 32.71204;-117.17288, 32.71225'

// 	console.log(formatCoords);
// 	//let directions = 
// 	axios.post('https://api.mapbox.com/directions/v5/' + profile + '?access_token=' + accessToken,
// 		formatCoords
// 		,
// 		{
// 			headers: {
// 				'Content-Type': 'application/x-www-form-urlencoded'
// 			}
// 		}
// 	).then(r => {
// 		console.log(r.data.routes);
// 	}).catch(err => {
// 		//console.log(err);
// 		console.log(err.response);
// 	})
	

// 	//send instructions to google
// 	//https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393

// });
//-------------------------------------------------------------------------------------------------------

app.get('/geo/', async(req,res) =>{
	let ip = req.ip;
	if(req.ip === ':::1' || req.ip === '::ffff:127.0.0.1'){
		ip ='45.44.230.61';
	}
	let geocode = axios.get('https://tools.keycdn.com/geo.json?host=' +ip).catch(err => {console.log(err)});
	//console.log(geocode.data.data);
	res.json(); //error if inside - geocode.data.data.geo
});



app.get('/redlightcam/', async(req, res) =>{
	let rlc = await axios.get('https://services.arcgis.com/G6F8XLCl5KtAlZ2G/arcgis/rest/services/Red_Light_Camera_Violations_2019/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json');

	res.json(rlc.data);
});

//maybe restructure?----------------------
// off shift error
app.post('/api/shiftmanager/', async(req, res)=>{
	
	let data = req.body;
	let driverCookies = req.cookies;

	let response= {};
	let result;
	let user = {
		userID : driverCookies.uid,
		ch : driverCookies.ch,
		onShift : data.onShift,
		shiftType : data.shiftType,
		inTeam : false
	};
	console.log(user.onShift);
	//toggle shift
	result = User.toggleShift(user);

	
	res.json(result);
});


app.post('/api/requestride/', async(req, res)=>{
	console.log(req.user);
	if(req.user.status){

		let tripRequest = {...req.body,...req.user.user};

		let tripResult = await Trip.newRequest(tripRequest);
		
		//ask driver if interested
		console.log(tripResult);
		res.json({'status':'ok'});
	}else{
		res.json({"status":"unauthorised"});
	}
	
	
});

app.post('/api/logout/', async(req,res)=>{
	res.clearCookie('uid');
	res.clearCookie('ch');
	res.clearCookie('driver');
	User.resetCookieHash(req.user.user.userID);
	req.user = {status:false};
	res.send('logged out');
});

//driver: while driver logged in --> looking for rides(check db for ride requests)

app.post('/api/login/', async(req, res)=>{
	//let loginResult = await User.loginUserWithPass(user.email, user.password);
	console.log(req.user.user);
	if(req.user.user.driver){
		//login as driver
	}
	res.json(req.user);
});


app.post('/api/createAccount/', async(req, res) => { //riders
	let data = req.body;
	console.log(data);
	let user = {
		email: data.email,
		pass: data.password,
		fname: data.fname,
		lname: data.lname,
		phone: data.phone,
		type: 'rider'
	};
	console.log(user);
	let userResult = await User.createUser(user);
	if(userResult.status){

		let loginResult = await User.loginUserWithPass(user.email, user.pass);
		if(loginResult.status){
			res.cookie('uid', user.userID, { maxAge: 1000 * 60 * 60 * 24 });
			res.cookie('ch', loginResult.cookieHash, { maxAge: 1000 * 60 * 60 * 24});
		}

	}else{
		//did not work
	}
	res.json(user);
	
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


