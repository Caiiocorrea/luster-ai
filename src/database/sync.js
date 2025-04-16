const sequelize = require("../config/database");
const AIAgent = require("../models/AIAgent");
const AIConversationHistory = require("../models/AIConversationHistory");
const AIFeedback = require("../models/AIFeedback");
const AIRules = require("../models/AIRules");
const AIVariables = require("../models/AIVariables");
const AIKnowledgeBase = require("../models/AIKnowledgeBase");

async function syncDatabase() {
  try {
    console.log("📌 Sincronizando banco de dados...");

    await AIAgent.sync({ alter: true }); 
    await AIRules.sync({ alter: true });
    await AIVariables.sync({ alter: true });
    await AIKnowledgeBase.sync({ alter: true });
    await AIConversationHistory.sync({ alter: true });
    await AIFeedback.sync({ alter: true });

    // Criar índice Full-Text Search no PostgreSQL
    await sequelize.query(`
      CREATE INDEX IF NOT EXISTS ai_knowledge_fts
      ON "AIKnowledgeBases"
      USING gin(to_tsvector('portuguese', value));
    `);

    console.log("✅ Banco de dados sincronizado e indexado com Full-Text Search!");

  } catch (error) {
    console.error("❌ Erro ao sincronizar banco de dados:", error.message);
  }
}

syncDatabase();