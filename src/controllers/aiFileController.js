const fs = require("fs");
const AIAgent = require("../models/AIAgent");
const AIKnowledgeBase = require("../models/AIKnowledgeBase");
const {
  extractTextFromPDF,
  extractTextFromDOCX,
  extractTextFromCSV,
  extractTextFromJSON,
} = require("../utils/fileProcessor");

async function uploadFile(req, res) {
  try {
    const { agent_id } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado." });
    }

    console.log(`📁 Processando arquivo: ${file.originalname}`);

    // Verificar se o agente existe
    const agent = await AIAgent.findByPk(agent_id);
    if (!agent) {
      return res.status(404).json({ error: "Agente de IA não encontrado." });
    }

    let extractedText = "";

    // Escolher a extração com base no tipo de arquivo
    if (file.mimetype === "application/pdf") {
      extractedText = await extractTextFromPDF(file.path);
    } else if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      extractedText = await extractTextFromDOCX(file.path);
    } else if (file.mimetype === "text/csv" || file.mimetype === "application/vnd.ms-excel") {
      extractedText = await extractTextFromCSV(file.path);
    } else if (file.mimetype === "application/json") {
      extractedText = await extractTextFromJSON(file.path);
    } else {
      return res.status(400).json({ error: "Tipo de arquivo não suportado." });
    }

    console.log("\n📝 Texto extraído do arquivo:\n", extractedText);

    if (!extractedText || extractedText.trim() === "") {
      return res.status(400).json({ error: "Nenhum conteúdo válido extraído do arquivo." });
    }

    // Salvar no banco de dados
    await AIKnowledgeBase.create({
      agent_id,
      type: "file",
      value: extractedText,
    });

    // Remover arquivo temporário
    fs.unlinkSync(file.path);

    res.json({ message: "Arquivo processado e armazenado com sucesso!", extractedText });
  } catch (error) {
    console.error("❌ Erro ao processar arquivo:", error.message);
    res.status(500).json({ error: "Erro ao processar o arquivo." });
  }
}

module.exports = { uploadFile };