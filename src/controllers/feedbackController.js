const express = require("express");
const {
  submitFeedback,
  listPendingFeedbacks,
  approveFeedback,
  rejectFeedback,
  getCorrectionHistory
} = require("../services/feedbackService");

async function handleSubmitFeedback(req, res) {
  try {
    const { user_id, agent_id, conversation_id, suggested_correction } = req.body;
    const feedback = await submitFeedback(user_id, agent_id, conversation_id, suggested_correction);
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function handleListPending(req, res) {
  try {
    const { agent_id } = req.params;
    const feedbacks = await listPendingFeedbacks(agent_id);
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function handleApproveFeedback(req, res) {
  try {
    const { feedback_id } = req.params;
    const feedback = await approveFeedback(feedback_id);
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function handleRejectFeedback(req, res) {
  try {
    const { feedback_id } = req.params;
    const feedback = await rejectFeedback(feedback_id);
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function handleCorrectionHistory(req, res) {
  try {
    const { agent_id } = req.params;
    const history = await getCorrectionHistory(agent_id);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  handleSubmitFeedback,
  handleListPending,
  handleApproveFeedback,
  handleRejectFeedback,
  handleCorrectionHistory
};