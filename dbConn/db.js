const dbe = require("mariadb");
const dbOpt = require("./keys");

module.exports = {
  connected: false,
  init: function() {
    try {
      //Postgres connection
      const { Client } = require('pg');

      const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      });

      client.connect();

      client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
        if (err) {
          throw err;
        }
        for (let row of res.rows) {
          console.log(JSON.stringify(row));
        }
        client.end();
      });
      client.end();
/////////////////////
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
  }


};

