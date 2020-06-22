const db = require('../dbConn/db.js');
const User = require('./user');
const Trip = require('./trip');
module.exports = {

    getTeamMembers: async function(teamID) {
        const conn = await db.getConnection();
        const result = await conn.query("SELECT `primaryID`, `secondaryID` FROM `dd4me`.`team` WHERE `teamID` = ?;",
            [teamID]);

        conn.end();
        let members = result[0];
    },
    autoPairTeam: async function(){
        primArray = User.getOnShiftPrimary();
        secArray = User.getOnShiftSecondary();
        
    },

    pairTeam: async function(primID, secID){
        let conn = await db.getConnection();
        const result = await conn.query("INSERT INTO `dd4me`.`team` (`primaryID`, `secondaryID`) VALUES (?, ?);",
            [primID, secID]);

        conn.end();
        if (result.affectedRows === 1) {
            return { status: true};
        } else {
            return { status: false };
        }
    },

    sendTripToTeam: async function(teamID, trip){

    }
}