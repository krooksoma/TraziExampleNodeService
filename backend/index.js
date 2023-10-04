const express = require("express");
const app = express();
const mysql = require("mysql");
const port = 5555;

// Create connection

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "defaria123",
  database: "demonstrationdb",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected");
});


// ////////////
// ENDPOINTS
// ////////////

app.get("/api/population/:state/:city", async (req, res) => {
  const state = req.params.state.toLowerCase();
  const city = req.params.city.toLowerCase();

  const select = `SELECT * FROM populationcensus WHERE city = ${city}`;

  try {
    if (data[state] && data[state][city]) 
      db.query(select, (err, results, fields) => {
        if (err) {
          console.log(err.message);
        }
        res.status(200).json(results);
      });
    
  } catch {
    res.status(400).json({ error: "State/City not found" });
  }
});

// PUT route to update or create population data
app.put("/api/population/:state/:city", (req, res) => {
  const state = req.params.state.toLowerCase();
  const city = req.params.city.toLowerCase();
  const population = parseInt(req.body);

  if (isNaN(population) || population < 0) {
    res.status(400).json({ error: "Invalid population data" });
  } else {
    if (!data[state]) {
      data[state] = {};
    }

    data[state][city] = population;

    const status = data[state][city] === population ? 200 : 201;
    res.status(status).json({ message: "Population data updated" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
