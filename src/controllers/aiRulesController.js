const AIRules = require("../models/AIRules");

async function addRule(req, res) {
  try {
    const { agent_id, rule_text } = req.body;
    if (!agent_id || !rule_text) {
      return res.status(400).json({ error: "Parâmetros incompletos: agent_id e rule_text são obrigatórios." });
    }
    const rule = await AIRules.create({ agent_id, rule_text });
    res.status(201).json(rule);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar regra" });
  }
}

async function getRules(req, res) {
  try {
    const { agent_id } = req.params;
    if (!agent_id) {
      return res.status(400).json({ error: "Parâmetro agent_id é obrigatório." });
    }
    const rules = await AIRules.findAll({ where: { agent_id } });
    res.json(rules);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar regras" });
  }
}

module.exports = { addRule, getRules };