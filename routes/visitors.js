const db = require("../database.js")
const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
    const sql = "select * from visitor"
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

// visitors on a particular date
router.get("/:id/:date", (req, res, next) => {
    const sql = "SELECT COUNT(*) AS count FROM visitor WHERE ibxId = ? AND date(d) = ?"
    const params = [req.params.id, req.params.date]
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

router.get("/region/:id/:date", (req, res, next) => {
  const sql = "SELECT region, COUNT(*) AS count FROM visitor WHERE ibxId = ? AND date(d) = ? GROUP BY region"
  const params = [req.params.id, req.params.date]
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});

router.get("/country/:id/:date", (req, res, next) => {
  const sql = "SELECT country, COUNT(*) AS count FROM visitor WHERE ibxId = ? AND date(d) = ? GROUP BY country"
  const params = [req.params.id, req.params.date]
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});

// total visitors as of the date
router.get("/total/:id/:date", (req, res, next) => {
  const sql = "SELECT COUNT(*) AS count FROM visitor WHERE ibxId = ? AND date(d) <= ?"
  const params = [req.params.id, req.params.date]
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});

router.get("/total/region/:id/:date", (req, res, next) => {
  const sql = "SELECT region, COUNT(*) AS count FROM visitor WHERE ibxId = ? AND date(d) <= ? GROUP BY region"
  const params = [req.params.id, req.params.date]
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});

router.get("/total/country/:id/:date", (req, res, next) => {
  const sql = "SELECT country, COUNT(*) AS count FROM visitor WHERE ibxId = ? AND date(d) <= ? GROUP BY country"
  const params = [req.params.id, req.params.date]
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});

// count of hours on every day of the week, based on previous data
router.get("/hours/:id/:date", (req, res, next) => {
  const sql = ` WITH hoursCount AS 
                  (SELECT strftime('%w', d) AS day, strftime('%H', d) AS hour, 
                    COUNT(*) AS count 
                    FROM visitor 
                    WHERE ibxId = ? AND date(d) <= ? 
                    GROUP BY strftime('%w', d), strftime('%H', d)),
                maxHourCount AS (SELECT day, MAX(count) AS maxCount FROM hoursCount GROUP BY day)
              SELECT hoursCount.day, hoursCount.hour, hoursCount.count
              FROM maxHourCount JOIN hoursCount 
              ON hoursCount.day = maxHourCount.day AND hoursCount.count = maxHourCount.maxCount
                  `
  const params = [req.params.id, req.params.date]
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});

module.exports = router;