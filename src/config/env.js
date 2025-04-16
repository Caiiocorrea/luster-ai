require("dotenv").config();

module.exports = {
  databaseUrl: process.env.DATABASE_URL,
  dbSsl: process.env.DB_SSL === "true",
  openAiApiKey: process.env.OPENAI_API_KEY,
  ollamaApiKey: process.env.OLLAMA_API_KEY,
  llamaApiKey: process.env.LLAMA_API_KEY,
};