const AIFeedback = require("../models/AIFeedback");
const AIKnowledgeBase = require("../models/AIKnowledgeBase");
const sequelize = require("../config/database");

async function processApprovedFeedbacks() {
  try {
    console.log("🔍 Verificando feedbacks aprovados para aprendizado contínuo...");

    const feedbacks = await AIFeedback.findAll({
      where: { status: "aprovado" },
    });

    for (let feedback of feedbacks) {
      const { agent_id, original_response, suggested_correction } = feedback;

      // Atualizar ou inserir no banco de conhecimento
      const [knowledgeEntry, created] = await AIKnowledgeBase.findOrCreate({
        where: { agent_id, value: original_response },
        defaults: { value: suggested_correction },
      });

      if (!created) {
        await knowledgeEntry.update({ value: suggested_correction });
        console.log(`✅ Atualizado conhecimento para o agente ${agent_id}`);
      } else {
        console.log(`✅ Adicionado novo conhecimento para o agente ${agent_id}`);
      }

      // Marcar feedback como processado para evitar reprocessamento
      await feedback.update({ status: "incorporado" });
    }

    console.log("🎉 Aprendizado contínuo concluído!");
  } catch (error) {
    console.error("❌ Erro ao processar feedbacks aprovados:", error.message);
  }
}

module.exports = { processApprovedFeedbacks };