const router = require('express').Router();
const populationRoutes = require("./population/populationRoutes");

router.use("/api/population", populationRoutes);

router.use("/*", (req, res) => {
    res.status(404).end();
  });

module.exports = router;