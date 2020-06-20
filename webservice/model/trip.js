const db = require('../dbConn/db.js');
const User = require('./user');

module.exports = {
    
    calcPrice: async function(trip){
        minutes = trip.minutes;
        km = trip.km;
        minimumFare = 20;

        baseFare = 5; //constant added to trips aka 'booking fee'
        perMinute = 0.20; //rate per minute
        perKm = 0.85; // rate per kilometer

        tripFare = minutes * perMinute + km * perKm;

        totalFare = tripFare + baseFare;
        if(totalFare < minimumFare){ // if smaller than min, change to min
            totalFare = minimumFare;
        }
        return totalFare;
    },

    newRequest: async function(trip){ //requested trips wont have driver IDs, they will be updated upon accepting
        console.log(trip);
        let conn = await db.getConnection();
        const result = await conn.query("INSERT INTO `dd4me`.`trip` (`requesterID`, `tripStatus`, `originLat`, `originLng`, `destLat`, `destLng`) VALUES (?, ?, ?, ?, ?, ?);",
            [trip.userID, "requested", trip.originLat, trip.originLng, trip.destLat, trip.destLng]);

        conn.end();
        if (result.affectedRows === 1) {
            trip.tripID = result.insertId;
            return { status: true, trip: trip, accepted: false };
        } else {
            return { status: false };
        }

    },



    // add SET parameters for secondaryID and tripStatus = ongoing
    acceptRequest: async function(trip){
        let conn = await db.getConnection();
        const result = await conn.query("UPDATE `trip` SET `primaryID` = ?, secondaryID = ?, tripStatus = ? WHERE tripID = ?;",
            [trip.primaryID, trip.secondaryID, "ongoing", trip.tripID]);

        conn.end();
        if (result.affectedRows === 1) {
            trip.tripID = result.insertId;
            return { status: true, trip: trip, accepted: true};
        } else {
            return { status: false };
        }
    },

    lookForTrip: async function(){ // look for a requested trip to be accepted
        const conn = await db.getConnection();
        const result = await conn.query("SELECT `tripID`, `requesterID`, `primaryID`, `secondaryID`, `originLat`, `originLng`, `destLat`, `destLng` FROM `dd4me`.`trip` WHERE `tripStatus`=?",
            ["requested"]);

        conn.end();
        let trip = result[0];
        if (result[0] !== undefined) {
            trip.requester = User.lookupUser(trip.requesterID);
            return { status: true, trip: trip};
        }else{
            return{status:false};
        }
    },

    lookupTrip: async function(tripID){ //lookup trip info, could be useful to double check if trip was accepted inbetween requests
        const conn = await db.getConnection();
        const result = await conn.query("SELECT `tripID`, `requesterID`, `primaryID`, `secondaryID`, `tripStatus`, `originLat`, `originLng`, `destLat`, `destLng` FROM `dd4me`.`trip` WHERE `tripID`=?",
            [tripID]);

        conn.end();
        if (result[0] !== undefined) {
            return { status: true, trip: result[0] };
        }else{
            return {status:false};
        }
    
    }
}