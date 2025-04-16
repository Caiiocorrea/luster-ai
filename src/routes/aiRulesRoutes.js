const express = require("express");
const router = express.Router();
const { addRule, getRules } = require("../controllers/aiRulesController");

router.post("/", addRule);
router.get("/:agent_id", getRules);

module.exports = router;