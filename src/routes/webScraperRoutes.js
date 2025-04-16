const express = require("express");
const router = express.Router();
const { analyzeWebsite } = require("../controllers/webScraperController");

router.post("/:agent_id/scrape", analyzeWebsite);

module.exports = router;