const express = require("express");
const router = express.Router();
const { setVariable, getVariables } = require("../controllers/aiVariablesController");

router.post("/", setVariable);
router.get("/:agent_id", getVariables);

module.exports = router;