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

router.get("/:id", (req, res, next) => {
    const sql = "SELECT * FROM visitor WHERE ibxId = ?"
    const params = [req.params.id]
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