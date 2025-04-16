const express = require("express");
const {
  handleSubmitFeedback,
  handleListPending,
  handleApproveFeedback,
  handleRejectFeedback,
  handleCorrectionHistory
} = require("../controllers/feedbackController");

const router = express.Router();

router.post("/feedback", handleSubmitFeedback);
router.get("/feedback/pending/:agent_id", handleListPending);
router.put("/feedback/approve/:feedback_id", handleApproveFeedback);
router.put("/feedback/reject/:feedback_id", handleRejectFeedback);
router.get("/feedback/history/:agent_id", handleCorrectionHistory);

module.exports = router;