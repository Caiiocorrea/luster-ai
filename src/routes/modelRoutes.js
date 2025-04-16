const express = require("express");
const { updateAIModel } = require("../controllers/modelController");

const router = express.Router();

// Rota para atualizar o modelo de IA de um agente específico
router.put("/update-model/:agent_id", updateAIModel);

module.exports = router;