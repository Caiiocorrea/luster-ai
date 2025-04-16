const prompts = require("../config/prompts");

async function chatWithAI(provider, model, userMessage) {
  const selectedModel = availableModels.find(m => m.name === model);
  if (!selectedModel) throw new Error("Modelo de IA não encontrado.");

  // Seleciona o prompt adequado para o modelo ou usa o padrão
  const promptTemplate = prompts[model] || prompts["default"];

  const fullPrompt = `
    ${promptTemplate.system}
    
    ${promptTemplate.user_prefix} ${userMessage}
    ${promptTemplate.assistant_prefix}
  `.trim();

  return callAPI(selectedModel.provider, model, fullPrompt);
}