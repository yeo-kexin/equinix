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
            d DATETIME
            )`,
        (err) => {
            if (err) {
                // table already created
                // console.log(err);
            } else {
                // table just created, creating some rows
                var insert = 'INSERT INTO visitor (ibxId, region, country, d) VALUES (?,?,?,?)'
                db.run(insert, ["1", "Asia", "Singapore", "2022-01-01 10:12:00"]) 
                
                db.run(insert, ["1", "Asia", "Singapore", "2022-02-10 17:30:00"])
                db.run(insert, ["1", "Asia", "Singapore", "2022-02-11 16:40:00"])
                db.run(insert, ["1", "Asia", "Singapore", "2022-02-11 16:50:00"])

                db.run(insert, ["1", "Asia", "Singapore", "2022-02-12 10:12:00"])
                db.run(insert, ["1", "Asia", "Singapore", "2022-02-12 10:25:00"])
                db.run(insert, ["1", "Europe", "Germany", "2022-02-12 10:30:00"])
                db.run(insert, ["1", "Europe", "France", "2022-02-12 10:45:00"])
                db.run(insert, ["1", "Asia", "Malaysia", "2022-02-12 12:30:00"])
                db.run(insert, ["1", "Europe", "Poland", "2022-02-12 14:00:00"])
                db.run(insert, ["1", "North America", "Canada", "2022-02-12 14:10:00"])
                db.run(insert, ["1", "North America", "Mexico", "2022-02-12 14:20:00"])


                db.run(insert, ["2", "Europe", "Germany", "2022-02-03 13:15:00"])
            }
        });  
    }
});


module.exports = db
