const express = require("express");
const { updateAgentModel } = require("../controllers/aiAgentController");

const router = express.Router();

router.put("/update-model/:agent_id", updateAgentModel);

module.exports = router;