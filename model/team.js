const db = require('../dbConn/db.js');
const User = require('./user');
const Trip = require('./trip');
module.exports = {

    getActiveTeams: async function(){
        const conn = await db.getConnection();
        const result = await conn.query("SELECT `teamID`,`primaryID`, `secondaryID`, `pairedOn` FROM `dd4me`.`team` WHERE `isActive` = true;");

        conn.end();
        let team = result[0];
        console.log("active team " +team);
        if (result[0] != undefined) {
            return { status: true, teams: team }
        } else {
            return {status: false}
        }
    },
    getTeamMembers: async function(teamID) {
        const conn = await db.getConnection();
        const result = await conn.query("SELECT `primaryID`, `secondaryID` FROM `dd4me`.`team` WHERE `teamID` = ?;",
            [teamID]);

        conn.end();
        let members = result[0];
        if(result[0] != undefined){
            return {status: true, members :result[0]}
        }else{
            return {status: false}
        }
    },
    autoPairTeam: async function(user){
        //gets a auto-matching shift type user
        let closestDriver = await User.getClosestOnShiftAll(user); 
        console.log("closest driver is: " + closestDriver.foundUser.userID + " shift type: " + closestDriver.foundUser.shiftType);
        let primDriver;
        let secDriver;
        let result;
        //if the found user is primary, requesting user needs to be secondary
        if (closestDriver.foundUser.shiftType == "primary"){
            primDriver = closestDriver.foundUser;
            secDriver = user;
            //if found user is secondary, request user needs to be primary
        } else if (closestDriver.foundUser.shiftType == "secondary"){
            primDriver = user;
            secDriver =  closestDriver.foundUser;
            //if found user is both, requester can be both
        } else if (closestDriver.foundUser.shiftType == "both"){
            //if requester user is primary, found user is secondary
            if(user.shiftType == "primary"){
                primDriver = user;
                secDriver = closestDriver.foundUser;
            //if requester user is secondary, found user is primary
            }else if(user.shiftType =="secondary"){
                primDriver = closestDriver.foundUser;
                secDriver = user;
            }
        }
        // user.userID, closestDriver.foundUser.userID
        if(closestDriver.status !== false){
            result = await this.pairTeam(primDriver, secDriver);
            console.log("teampair id ", result.teamID);
            user.teamID = result.teamID;
        }
        if(result.status == true){
            return {status :true, user :user}
        }else{
            return {status:false}
        }

    },

    unpairTeam: async function(uid){
        let conn = await db.getConnection();
        const result = await conn.query("UPDATE `team` SET `isActive` = 0, `disbandedOn` = current_timestamp() WHERE (`primaryID` = ? OR `secondaryID` =?) AND `isActive` = 1;",
            [uid,uid]);

        conn.end();
        if (result.affectedRows === 1) {
            return { status: true };
        } else {
            return { status: false };
        }
    },

    pairTeam: async function(primDriver, secDriver){
        console.log(primDriver);
        let conn = await db.getConnection();
        const result = await conn.query("INSERT INTO `dd4me`.`team` (`primaryID`, `secondaryID`,`currLocationLat`, `currLocationLng`) VALUES (?, ?, ?, ?);",
            [primDriver.userID, secDriver.userID, primDriver.locationLat, primDriver.locationLng]);

        conn.end();
        if (result.affectedRows === 1) {
            return { status: true, teamID: result.insertId};
        } else {
            return { status: false };
        }
    },

    sendTripToTeam: async function(teamID, trip){

    },

    getClosestTeam: async function(lat, lng){
        const conn = await db.getConnection();
        const result = await conn.query("SELECT `teamID`, `primaryID`, `secondaryID`, `pairedOn`  FROM `dd4me`.`team` WHERE `isActive` = true ORDER BY SQRT(POW(? - `currLocationLat`, 2) + POW(? - `currLocationLng`, 2))",
            [lat, lng]);

        conn.end();
        if(result[0] != undefined){

            return {status:true, team: result[0]}
        }else{
            return {status:false}
        }
    }
}