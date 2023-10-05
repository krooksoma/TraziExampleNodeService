const router = require("express").Router();
const populationRoutes = require("./population/populationRoutes");

router.use("/population", populationRoutes);

router.get("*", (req, res) => {
  res.status(404).json({error: "Page Not Found"});
});

module.exports = router;
