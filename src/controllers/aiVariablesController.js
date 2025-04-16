const AIVariables = require("../models/AIVariables");

async function setVariable(req, res) {
  try {
    const { agent_id, key, value } = req.body;
    const variable = await AIVariables.create({ agent_id, key, value });
    res.status(201).json(variable);
  } catch (error) {
    res.status(500).json({ error: "Erro ao definir variável" });
  }
}

async function getVariables(req, res) {
  try {
    const { agent_id } = req.params;
    const variables = await AIVariables.findAll({ where: { agent_id } });
    res.json(variables);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar variáveis" });
  }
}

module.exports = { setVariable, getVariables };