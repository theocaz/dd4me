const dbe = require("mariadb");
const dbOpt = require("./keys");
var mysql = require('mysql');


module.exports = {
  connected: false,
  init: function() {
    try {
    
      this.pool = dbe.createPool(dbOpt);
      this.connected = true;
    } catch (e) {
      console.log(e);
    }
  },
  getConnection: async function() {
    if (this.connected) {
      return await this.pool.getConnection()
      .catch ((e) => {
        console.log(e);
      });
    } else {
      console.log("Database not connected!");
    }
  },
  closeConnection: async function(){
    if(this.connected){
      return await this.pool.end(function (err) {
      // all connections in the pool have ended
      console.log(err);
      });
    } else {
      console.log("Database not connected!");
    }
  }

};

