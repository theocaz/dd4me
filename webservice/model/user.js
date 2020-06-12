const db = require('../dbConn/db.js');
const crypto = require('crypto');

module.exports = {
    
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

    loginUserWithCookie: async function(email, cookieHash){
        const ins = await db.getConnection();
        let cookieInsert = await ins.query("UPDATE `user` SET `cookieHash` = ? WHERE userID = ?;",
            [cookieHash, result[0].userID]);
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
    