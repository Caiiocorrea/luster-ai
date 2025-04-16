const express = require("express");
const router = express.Router();
const { handleUserMessage } = require("../controllers/aiChatController");

router.post("/", handleUserMessage);

module.exports = router;