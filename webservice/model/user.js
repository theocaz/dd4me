const db = require('../dbConn/db.js');
const crypto = require('crypto');

module.exports = {
    

    requestRide: async function(uid, originLat, originLng, destLat, destLng){
        let conn = await db.getConnection();
        const result = await conn.query("INSERT INTO `dd4me`.`riderequest` (`email`, `originLat`, `originLng`, `destLat`,`destLng`) VALUES (?, ?, ?, ?, ?);",
            [uid, originLat, originLng, destLat, destLng]);

        conn.end();
        if (result.affectedRows === 1) {
            return { status: true};
        } else {
            return { status: false };
        };
    },

    resetCookieHash: async function(uid){
        let ins = await db.getConnection();
        let cookieInsert = await ins.query("UPDATE `user` SET `cookieHash` = ? WHERE userID = ?;",
            ["logout", uid]);

        ins.end();
        return true;
    },

    loginUserWithPass: async function(email, password){
        let conn = await db.getConnection();
        let passHash = crypto.createHash('sha1').update(password).digest('base64');
        const result = await conn.query("SELECT `userID`, `email`, `passHash`, `type`, `fName`, `lName`, `phone` FROM `dd4me`.`user` WHERE `email`=? AND `passHash` = ?",
            [email, passHash]);
        if(result[0] !== undefined){
            let cookieHash = crypto.createHash('sha1').update(Math.random().toString()).digest('base64');
            const ins = await db.getConnection();
            let cookieInsert = await ins.query("UPDATE `user` SET `cookieHash` = ? WHERE userID = ?;",
                [cookieHash, result[0].userID]);

            ins.end();
            conn.end();
            return {status: true, user:result[0], cookieHash:cookieHash};
        }
        conn.end();
        return {status:false};
    },

    loginUserWithCookie: async function(uid, cookieHash){
        const conn = await db.getConnection();
        const result = await conn.query("SELECT `userID`, `email`, `type` FROM `dd4me`.`user` WHERE `userID`=? AND `cookieHash` = ?",
            [uid, cookieHash]);

        conn.end();
        if(result[0] !== undefined){
            return { status: true, user: result[0], cookieHash: cookieHash};
        }
        
    },
    

    createUser: async function(user) {
        //console.log(user.pass);
        let passHash = crypto.createHash('sha1').update(user.pass).digest('base64');
        let conn = await db.getConnection();
        const result = await conn.query("INSERT INTO `dd4me`.`user` (`email`, `fName`,`lName`, `passHash`, `type`, `phone`) VALUES (?, ?, ?, ?, ?, ?);",
        [user.email, user.fname, user.lname, passHash, user.type, user.phone]);

        conn.end();
        if(result.affectedRows === 1){
            user.userID = result.insertId;
            return {status: true, user:user}; 
        }else{
            return {status: false};
        }
    },

    lookupUser: async function(uid){
        const conn = await db.getConnection();
        const result = await conn.query("SELECT `fName`, `lName`, `phone` FROM `dd4me`.`user` WHERE `userID`=?",
            [uid]);

        conn.end();
        if (result[0] !== undefined) {
            return { status: true, user: result[0]};
        }else{
            return {status : false}
        }
    },

    toggleShift: async function(user){
        console.log(user.onShift);
        const conn = await db.getConnection();
        let result = await conn.query("UPDATE `user` SET `onShift` = ?, `shiftType` = ?, `inTeam`= ?, `currLocationLat` =?, `currLocationLng` = ? WHERE `userID` = ? AND `cookieHash` = ?;",
            [user.onShift, user.shiftType, 'false',user.locationLat, user.locationLng, user.userID, user.ch]);

        conn.end();
        
        if (result[0] !== undefined) {
            return { status: true };
        } else {
            return { status: false }
        }
    },

    getOnShiftAll: async function(){
        const conn = await db.getConnection();
        const result = await conn.query("SELECT `fName`, `lName`, `phone`, `shiftType`, `inTeam` FROM `dd4me`.`user` WHERE `onShift`=?",
            ["true"]);

        conn.end();
        if (result[0] !== undefined) {
            return { status: true, driver: result };
        } else {
            return { status: false }
        }
    },

    getClosestOnShiftAll: async function (user) {
        let wantedShiftType;
        if(user.shiftType == "both"){
            wantedShiftType = "'both', 'primary', 'secondary'";
        } else if (user.shiftType == "primary"){
            wantedShiftType = "'both', 'secondary'";
        }else{
            wantedShiftType = "'both', 'primary'";
        }

        const conn = await db.getConnection();
        const result = await conn.query("SELECT `fName`, `lName`, `phone`, `shiftType` FROM `dd4me`.`user` WHERE `inTeam` = false AND `onShift`= true AND `shiftType` IN (?) ORDER BY SQRT(POW(? - `currLocationLat`, 2) + POW(? - `currLocationLng`, 2))",
            [wantedShiftType, user.locationLat, user.locationLng]);

        conn.end();
        if (result[0] !== undefined) {
            return { status: true, driver: result[0] };
        } else {
            return { status: false }
        }
    },
    
    getOnShiftPrimary: async function(){
        const conn = await db.getConnection();
        const result = await conn.query("SELECT `fName`, `lName`, `phone`, `shiftType`, `inTeam` FROM `dd4me`.`user` WHERE `onShift`=? AND `shiftType` = ? OR `shiftType` = ?;",
            ["true", "primary", "both"]);

        conn.end();
        if (result[0] !== undefined) {
            return { status: true, primaryDriver: result };
        } else {
            return { status: false }
        }
    },
    
    getOnShiftSecondary: async function(){
        const conn = await db.getConnection();
        const result = await conn.query("SELECT `fName`, `lName`, `phone`, `shiftType`, `inTeam` FROM `dd4me`.`user` WHERE `onShift`=? AND `shiftType` = ? OR `shiftType` = ?;",
            ["true", "secondary", "both"]);

        conn.end();
        if (result[0] !== undefined) {
            return { status: true, secondaryDriver: result };
        } else {
            return { status: false }
        }
    }

};
    