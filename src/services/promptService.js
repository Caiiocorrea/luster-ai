function buildPrompt(agent, rulesText, variablesText, internalKnowledge, externalKnowledge, userMessage) {
    return `
      🔹 **Identidade do Agente**  
      Você é um assistente chamado "${agent.name}". Seu propósito e comportamento foram definidos pelo usuário como:  
      **"${agent.prompt}"**  
  
      🔹 **Regras Obrigatórias**  
      Você deve seguir as seguintes diretrizes sem exceção:  
      ${rulesText || "Nenhuma regra definida."}
  
      🔹 **Informações Contextuais**  
      O usuário forneceu as seguintes informações de contexto:  
      ${variablesText || "Nenhuma variável disponível."}
  
      🔹 **Fontes Internas (Arquivos e Documentos)**  
      Aqui estão as informações armazenadas internamente que podem ajudar na resposta:  
      ${internalKnowledge || "Nenhuma fonte interna disponível."}
  
      🔹 **Fontes Externas (Websites e APIs)**  
      Além disso, as seguintes fontes externas podem conter informações úteis:  
      ${externalKnowledge || "Nenhuma fonte externa disponível."}
  
      🔹 **Pergunta do Usuário**  
      Usuário: ${userMessage}  
      Responda respeitando o prompt e as regras acima.
    `;
  }
  
  module.exports = { buildPrompt };