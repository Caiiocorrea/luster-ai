const AIFeedback = require("../models/AIFeedback.js"); 
const AIConversationHistory = require("../models/AIConversationHistory");
const AIAgent = require("../models/AIAgent");
const { Op } = require("sequelize");

async function submitFeedback(user_id, agent_id, conversation_id, suggested_correction) {
  try {
    const conversation = await AIConversationHistory.findByPk(conversation_id);
    if (!conversation) throw new Error("Conversa não encontrada.");

    return await AIFeedback.create({
      agent_id,
      user_id,
      conversation_id,
      original_response: conversation.ai_response,
      suggested_correction,
      status: "pendente"
    });
  } catch (error) {
    console.error("Erro ao registrar feedback:", error.message);
    throw error;
  }
}

async function listPendingFeedbacks(agent_id) {
  return await AIFeedback.findAll({
    where: { agent_id, status: "pendente" }
  });
}

async function approveFeedback(feedback_id) {
  const feedback = await AIFeedback.findByPk(feedback_id);
  if (!feedback) throw new Error("Feedback não encontrado.");

  feedback.status = "aprovado";
  await feedback.save();

  return feedback;
}

async function rejectFeedback(feedback_id) {
  const feedback = await AIFeedback.findByPk(feedback_id);
  if (!feedback) throw new Error("Feedback não encontrado.");

  feedback.status = "rejeitado";
  await feedback.save();

  return feedback;
}

async function getCorrectionHistory(agent_id) {
  return await AIFeedback.findAll({
    where: { agent_id, status: "aprovado" }
  });
}

module.exports = {
  submitFeedback,
  listPendingFeedbacks,
  approveFeedback,
  rejectFeedback,
  getCorrectionHistory
};