const express = require("express");
const app = express();
const db = require("./config/databaseConfig")
const port = 5555;
const bodyParser = require("body-parser");
const controllers = require("./controllers");

// Create connection

db.connect((err) => {
  if (err) {
    console.log(err.message);
    throw err;
  }
  console.log("MySql Connected");
});

app.use(express.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(controllers);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
