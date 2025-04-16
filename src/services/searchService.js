const AIKnowledgeBase = require("../models/AIKnowledgeBase");
const { Op, Sequelize } = require("sequelize");
const sequelize = require("../config/database");

// Lista de palavras irrelevantes para ignorar na busca
const stopwords = new Set([
  "o", "a", "os", "as", "um", "uma", "uns", "umas", "de", "da", "do", "das", "dos",
  "e", "é", "foi", "são", "ser", "que", "qual", "quais", "como", "mais", "menos", "para"
]);

async function searchKnowledge(agent_id, userMessage) {
    try {
        console.log(`🔍 Buscando informações relacionadas a: "${userMessage}" para o agente ${agent_id}`);

        // Remover stopwords para melhorar a busca
        const filteredQuery = userMessage
            .toLowerCase()
            .split(/\s+/)
            .filter(word => !stopwords.has(word)) // Remove palavras irrelevantes
            .join(" & "); // Junta os termos para o formato correto

        if (!filteredQuery) {
            console.log("⚠️ Consulta ignorada devido a palavras irrelevantes.");
            return null;
        }

        // Executa a busca no banco de dados
        const results = await AIKnowledgeBase.findAll({
            where: sequelize.literal(`
                to_tsvector('portuguese', unaccent(value)) @@ plainto_tsquery('portuguese', unaccent('${userMessage}'))
            `),
            attributes: ["value"],
            replacements: { query: filteredQuery } // Evita injeção de SQL
        });

        console.log("📚 Resultados da busca após otimização:", results);

        if (results.length === 0) {
            return null;
        }

        // Retorna os valores encontrados formatados
        return results.map(r => r.value).join("\n\n");
    } catch (error) {
        console.error("❌ Erro ao buscar conhecimento interno:", error.message);
        return null;
    }
}

module.exports = { searchKnowledge };