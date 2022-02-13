const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const ibx = require('./routes/ibx');
const visitors = require('./routes/visitors');

// handle CORS issues
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.use('/api/ibx', ibx);

app.use('/api/visitors', visitors);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



