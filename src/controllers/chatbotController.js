const { chatWithAI } = require("../services/aiService");

async function handleChatRequest(req, res) {
  try {
    const { apiName, modelName, message } = req.body;

    if (!apiName || !modelName || !message) {
      return res.status(400).json({ error: "Parâmetros incompletos: apiName, modelName e message são obrigatórios." });
    }

    const response = await chatWithAI(apiName, modelName, message);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { handleChatRequest };