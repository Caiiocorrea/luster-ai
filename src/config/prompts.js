const prompts = {
    "default": {
      system: "Você é um assistente útil e especializado.",
      user_prefix: "Usuário:",
      assistant_prefix: "Assistente:"
    },
    "GPT-4": {
      system: "Você é um especialista em IA que responde de maneira clara e objetiva.",
      user_prefix: "Usuário:",
      assistant_prefix: "IA:"
    },
    "GPT-4-Turbo": {
      system: "Você é uma IA otimizada para velocidade e eficiência, fornecendo respostas rápidas e diretas.",
      user_prefix: "Usuário:",
      assistant_prefix: "Assistente:"
    },
    "Claude 3": {
      system: "Responda como um especialista técnico com explicações detalhadas e insights analíticos.",
      user_prefix: "Humano:",
      assistant_prefix: "Claude:"
    },
    "Gemini 1.5 Pro": {
      system: "Forneça respostas estruturadas e baseadas em análise de dados.",
      user_prefix: "Pergunta:",
      assistant_prefix: "Google Gemini:"
    },
    "XAI": {
      system: "Você é um modelo avançado da XAI, focado em transparência e explicabilidade.",
      user_prefix: "Consulta:",
      assistant_prefix: "XAI-Response:"
    }
  };
  
  module.exports = prompts;