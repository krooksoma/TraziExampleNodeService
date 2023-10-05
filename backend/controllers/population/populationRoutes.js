const router = require("express").Router();
const db = require("../../config/databaseConfig");

function addNewValues(state, city, population) {
  const addData = `INSERT INTO populationcensus(state, city, population) VALUES ('${state}', '${city}', ${population})`;

  db.query(addData, (err, results) => {
    if (err) {
      throw err;
    }
    return;
  });
}

router.get("/:state/:city", async (req, res) => {
  const state = req.params.state.toLowerCase();
  const city = req.params.city.toLowerCase();

  const query = `SELECT population FROM populationcensus WHERE city = '${city}' AND state = '${state}'`;

  await db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      res.status(400).json({ error: "State/City not found" });
      return;
    } else {
      res.status(200).json(results);
    }
  });
});

// PUT route to update or create population data
router.put("/:state/:city", async (req, res) => {
  const state = req.params.state.toLowerCase();
  const city = req.params.city.toLowerCase();
  const population = parseInt(req.body);

  const query = `UPDATE populationcensus SET population = ${population} WHERE city = '${city}' AND state = '${state}'`;

  if (isNaN(population) || population < 0) {
    res.status(400).json({ error: "Invalid population data" });
  }

  await db.query(query, (err, results, field) => {
    if (err) {
      res
        .status(400)
        .json({ error: `Data was not updated due to ${err.message}` });
    }

    if (results.affectedRows === 0) {
      addNewValues(state, city, population);
      res.status(201).json({
        message:
          "New State and City added to the System",
      });
      return;
    }
    res.status(200).json({
      message: `Data successfully updated with new value: ${population}`,
    });
  });
});

router.put("*", function (req, res) {
  res.status(404).json({ error: "page not found" });
});

router.get("*", function (req, res) {
  res.status(404).json({ error: "page not found" });
});

module.exports = router;
