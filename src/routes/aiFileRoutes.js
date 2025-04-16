const express = require("express");
const multer = require("multer");
const router = express.Router();
const { uploadFile } = require("../controllers/aiFileController");

const upload = multer({ dest: "uploads/" }); // Armazena arquivos temporariamente

router.post("/:agent_id", upload.single("file"), uploadFile);

module.exports = router;