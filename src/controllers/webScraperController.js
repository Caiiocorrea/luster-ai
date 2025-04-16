const { scrapeWebsite } = require("../utils/webScraper");
const AIKnowledgeBase = require("../models/AIKnowledgeBase");

async function analyzeWebsite(req, res) {
  try {
    const { agent_id } = req.params;
    const { url, depth } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL não fornecida." });
    }

    console.log(`🔍 Iniciando extração de ${url} com profundidade ${depth || 1}...`);

    const extractedData = await scrapeWebsite(url, depth || 1);

    if (!extractedData) {
      return res.status(500).json({ error: "Erro ao processar o website." });
    }

    console.log(`✅ Dados extraídos do site:\n`, extractedData);

    // 📌 LOG PARA TESTAR O DADO A SER SALVO
    console.log("📌 Salvando no banco de dados:", JSON.stringify(extractedData, null, 2));

    // 📌 Salvando no banco de dados
    await AIKnowledgeBase.create({
      agent_id,
      type: "link",
      value: JSON.stringify(extractedData)
    });

    res.json({
      message: "Conteúdo do website extraído e armazenado com sucesso!",
      data: extractedData
    });
  } catch (error) {
    console.error("❌ Erro ao processar site:", error.message);
    res.status(500).json({ error: "Erro ao processar o website." });
  }
}

module.exports = { analyzeWebsite };