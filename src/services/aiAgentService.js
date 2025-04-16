const { chatWithAI } = require("./aiService");
const AIAgent = require("../models/AIAgent");

async function processUserMessage(agent_id, userMessage) {
  try {
    console.log("\n🔍 Processando mensagem para o agente:", agent_id);

    // Buscar o agente e verificar qual modelo de IA ele está usando
    const agent = await AIAgent.findByPk(agent_id);
    if (!agent) {
      throw new Error("Agente não encontrado.");
    }

    const selectedModel = agent.model || "gpt-4"; // Se não houver modelo, usar o padrão

    // Criar o prompt otimizado
    const fullPrompt = `
      Assistente: ${agent.name}
      Objetivo: ${agent.prompt}

      🔹 Pergunta do Usuário:
      Usuário: ${userMessage}
      Responda respeitando o contexto acima.
    `;

    console.log(`🛠️ Usando modelo de IA: ${selectedModel}`);

    // Enviar para a IA com o modelo escolhido
    const aiResponse = await chatWithAI("OpenAI", selectedModel, fullPrompt);

    return aiResponse;
  } catch (error) {
    console.error("❌ Erro no processamento da mensagem:", error.message);
    return "Erro ao processar a mensagem.";
  }
}