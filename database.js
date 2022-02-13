var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    } else {
        console.log('Connected to the SQLite database')
        
        // create IBX
        db.run(`CREATE TABLE ibx (
            id INTEGER PRIMARY KEY
            )`,
        (err) => {
            if (err) {
                // table already created
                // console.log(err);
            } else {
                // table just created, creating some rows
                var insert = 'INSERT INTO ibx (id) VALUES (?)'
                db.run(insert, ["1"])
                db.run(insert, ["2"])
                db.run(insert, ["3"])
                db.run(insert, ["4"])
                db.run(insert, ["5"])             
            }
        });  
        
        // create visitor
        db.run(`CREATE TABLE visitor (
            ibxId INTEGER,
            region TEXT, 
            country TEXT,
            date DATETIME
            )`,
        (err) => {
            if (err) {
                // table already created
                // console.log(err);
            } else {
                // table just created, creating some rows
                var insert = 'INSERT INTO visitor (ibxId, region, country, date) VALUES (?,?,?,?)'
                db.run(insert, ["1", "Asia", "Singapore", "2022-02-02 10:12:00"])
                db.run(insert, ["2", "Europe", "Germany", "2022-02-03 13:15:00"])
            }
        });  
    }
});


module.exports = db
