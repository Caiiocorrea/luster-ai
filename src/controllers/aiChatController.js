const { processUserMessage } = require("../services/aiAgentService.js");

async function handleUserMessage(req, res) {
  try {
    const { agent_id, message } = req.body;
    
    if (!agent_id || !message) {
      return res.status(400).json({ error: "Parâmetros incompletos: agent_id e message são obrigatórios." });
    }

    const response = await processUserMessage(agent_id, message);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { handleUserMessage };