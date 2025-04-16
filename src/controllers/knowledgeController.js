const AIKnowledgeBase = require("../models/AIKnowledgeBase");

async function addKnowledge(req, res) {
  try {
    const { agent_id, type, value } = req.body;

    if (!agent_id || !type || !value) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios: agent_id, type e value." });
    }

    console.log(`📚 Adicionando conhecimento para o agente ${agent_id} - Tipo: ${type}`);

    const knowledge = await AIKnowledgeBase.create({
      agent_id,
      type,
      value
    });

    res.status(201).json({
      message: "Conhecimento armazenado com sucesso!",
      data: knowledge
    });
  } catch (error) {
    console.error("❌ Erro ao adicionar conhecimento:", error.message);
    res.status(500).json({ error: "Erro ao adicionar conhecimento." });
  }
}

module.exports = { addKnowledge };