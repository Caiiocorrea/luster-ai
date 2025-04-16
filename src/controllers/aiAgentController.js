const AIAgent = require("../models/AIAgent");

async function updateAgentModel(req, res) {
  try {
    const { agent_id } = req.params;
    const { model } = req.body;

    if (!model) {
      return res.status(400).json({ error: "O modelo de IA é obrigatório." });
    }

    const agent = await AIAgent.findByPk(agent_id);
    if (!agent) {
      return res.status(404).json({ error: "Agente não encontrado." });
    }

    agent.model = model;
    await agent.save();

    res.json({ message: "Modelo atualizado com sucesso!", agent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { updateAgentModel };