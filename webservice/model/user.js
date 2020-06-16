const db = require('../dbConn/db.js');
const crypto = require('crypto');

module.exports = {
    
    requestRide: async function(email, originLat, originLng, destLat, destLng){
        let conn = await db.getConnection();
        const result = await conn.query("INSERT INTO `dd4me`.`riderequest` (`email`, `originLat`, `originLng`, `destLat`,`destLng`) VALUES (?, ?, ?, ?, ?);",
            [email, originLat, originLng, destLat, destLng]);

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
        const result = await conn.query("SELECT `userID`, `email`, `passHash` FROM `dd4me`.`user` WHERE `email`=? AND `passHash` = ?",
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
        const result = await conn.query("SELECT `userID`, `email` FROM `dd4me`.`user` WHERE `userID`=? AND `cookieHash` = ?",
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
        const result = await conn.query("INSERT INTO `dd4me`.`user` (`email`, `fName`,`lName`, `passHash`) VALUES (?, ?, ?, ?);",
        [user.email, user.fname, user.lname, passHash]);

        conn.end();
        if(result.affectedRows === 1){
            user.userID = result.insertId;
            return {status: true, user:user}; 
        }else{
            return {status: false};
        }
    }

};
    