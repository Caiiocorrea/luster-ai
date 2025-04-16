const { processApprovedFeedbacks } = require("../services/learningService");

async function learningJob() {
  console.log("🧠 Iniciando aprendizado contínuo...");
  await processApprovedFeedbacks();
}

// Rodar aprendizado contínuo a cada 1 hora
setInterval(learningJob, 60 * 60 * 1000);

module.exports = { learningJob };