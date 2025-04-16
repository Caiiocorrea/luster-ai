const fetch = require("node-fetch");
const cheerio = require("cheerio");
const AIKnowledgeBase = require("../models/AIKnowledgeBase");
const { URL } = require("url");

async function fetchExternalData(agent_id) {
    try {
        console.log(`🌐 Buscando fontes externas para o agente ${agent_id}`);

        // Obtendo links do banco de dados
        const links = await AIKnowledgeBase.findAll({
            where: { agent_id, type: "link" },
            attributes: ["value"]
        });

        if (!links.length) {
            console.log("⚠️ Nenhum link externo encontrado para este agente.");
            return "Nenhuma fonte externa disponível.";
        }

        let extractedData = [];

        for (const link of links) {
            const url = link.value;
            console.log(`🔗 Extraindo conteúdo de: ${url}`);

            try {
                // Verifica se é uma URL válida antes de tentar acessar
                new URL(url);

                const response = await fetch(url, {
                    headers: {
                        "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
                    }
                });

                if (!response.ok) {
                    console.warn(`⚠️ Falha ao acessar ${url}: ${response.statusText}`);
                    continue;
                }

                const html = await response.text();
                const $ = cheerio.load(html);

                // Extraindo apenas o texto útil
                const pageText = $("body").text().replace(/\s+/g, " ").trim();

                if (pageText.length > 0) {
                    extractedData.push({ url, text: pageText });
                }

            } catch (error) {
                console.error(`❌ Erro ao processar ${url}:`, error.message);
            }
        }

        console.log("✅ Fontes externas extraídas com sucesso!");
        return extractedData.length ? extractedData : "Nenhuma informação relevante extraída.";
    } catch (error) {
        console.error("❌ Erro ao buscar fontes externas:", error.message);
        return "Nenhuma fonte externa disponível.";
    }
}

module.exports = { fetchExternalData };