const AIKnowledgeBase = require("../models/AIKnowledgeBase");

async function addKnowledge(req, res) {
  try {
    const { agent_id, type, value } = req.body;
    const knowledge = await AIKnowledgeBase.create({ agent_id, type, value });
    res.status(201).json(knowledge);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar conhecimento" });
  }
}

module.exports = { addKnowledge };