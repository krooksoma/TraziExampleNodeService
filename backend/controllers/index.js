const router = require('express').Router();
const apiRoutes = require("./api/api");

router.use("/api", apiRoutes);

router.get("*", (req, res) => {
    res.status(404).json({error: "Page Not Found"});
  });

module.exports = router;