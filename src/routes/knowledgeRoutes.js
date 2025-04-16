const express = require("express");
const router = express.Router();
const { addKnowledge } = require("../controllers/knowledgeController");

// Criar conhecimento interno
router.post("/", addKnowledge);

module.exports = router;