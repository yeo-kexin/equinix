const db = require("../database.js")
const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
    const sql = "select * from ibx"
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
    const sql = "SELECT * FROM ibx WHERE id = ?"
    const params = [req.params.id]
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        if (rows.length > 0) {
          res.json({
            "message": "success",
            "data": rows
          });
        } else {
          res.json({
            "message": "ibx id does not exist",
          });
          return;
        }
      });
});

module.exports = router;