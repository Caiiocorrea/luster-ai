const AIAgent = require("../models/AIAgent");
const AIRules = require("../models/AIRules");
const AIVariables = require("../models/AIVariables");
const AIKnowledgeBase = require("../models/AIKnowledgeBase");

async function getAgentData(agent_id) {
  try {
    // 1️⃣ Obter informações básicas do agente
    const agent = await AIAgent.findByPk(agent_id);
    if (!agent) throw new Error("Agente não encontrado.");

    // 2️⃣ Obter regras do agente
    const rules = await AIRules.findAll({ where: { agent_id } });
    const rulesText = rules.map(rule => rule.rule_text).join("\n");

    // 3️⃣ Obter variáveis do agente
    const variables = await AIVariables.findAll({ where: { agent_id } });
    const variablesText = variables.map(v => `${v.key}: ${v.value}`).join("\n");

    // 4️⃣ Obter conhecimento armazenado (arquivos e fontes externas)
    const knowledge = await AIKnowledgeBase.findAll({ where: { agent_id } });

    // 5️⃣ Separar fontes internas (arquivos) e fontes externas (websites, APIs)
    const internalKnowledge = knowledge
      .filter(k => k.type === "file" && k.value)
      .map(k => k.value)
      .join("\n\n");

    // 📌 Garantir que `externalSources` sempre seja um array válido
    let externalSources = [];
    try {
      externalSources = knowledge
        .filter(k => k.type === "link" && k.value)
        .map(k => {
          try {
            return JSON.parse(k.value);
          } catch (jsonError) {
            console.warn(`⚠️ Erro ao converter JSON da fonte externa: ${k.value}`);
            return null;
          }
        })
        .filter(item => item !== null); // Remove entradas inválidas
    } catch (error) {
      console.error("❌ Erro ao processar fontes externas:", error.message);
      externalSources = [];
    }

    // 🔹 Garante que `externalSources` nunca será undefined ou null
    if (!Array.isArray(externalSources)) {
      externalSources = [];
    }

    return {
      agent,
      rulesText,
      variablesText,
      internalKnowledge,
      externalSources
    };
  } catch (error) {
    console.error("❌ Erro ao obter dados do agente:", error.message);
    return null;
  }
}

module.exports = { getAgentData };