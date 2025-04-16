const AIContext = require("../models/AIContext");
const { getAgentData } = require("./agentDataService");

async function getOrCreateContext(agent_id) {
  let context = await AIContext.findOne({ where: { agent_id } });

  if (!context) {
    console.log(`📌 Criando novo contexto para o agente ${agent_id}`);
    const { agent, rulesText, variablesText, internalKnowledge } = await getAgentData(agent_id);

    const contextSummary = `
      Assistente: ${agent.name}
      Objetivo: ${agent.prompt}
      Regras: ${rulesText}
      Informações Contextuais: ${variablesText}
      Fontes Internas: ${internalKnowledge}
    `.trim();

    context = await AIContext.create({
      agent_id,
      context_summary: contextSummary
    });
  }

  return context.context_summary;
}

async function updateContext(agent_id, additionalInfo) {
  let context = await AIContext.findOne({ where: { agent_id } });

  if (!context) {
    context = await getOrCreateContext(agent_id);
  }

  console.log(`🔄 Atualizando contexto do agente ${agent_id}`);
  context.context_summary += `\n\n${additionalInfo}`;
  await context.save();
}

module.exports = { getOrCreateContext, updateContext };