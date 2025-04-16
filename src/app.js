require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// 🔹 Rotas existentes
const chatbotRoutes = require("./routes/chatbotRoutes");
app.use("/api/chatbot", chatbotRoutes);

const aiAgentRoutes = require("./routes/aiAgentRoutes");
app.use("/api/agents", aiAgentRoutes);

const aiVariablesRoutes = require("./routes/aiVariablesRoutes");
app.use("/api/variables", aiVariablesRoutes);

const aiChatRoutes = require("./routes/aiChatRoutes");
app.use("/api/chat", aiChatRoutes);

const aiRulesRoutes = require("./routes/aiRulesRoutes");
app.use("/api/rules", aiRulesRoutes);

const aiFileRoutes = require("./routes/aiFileRoutes");
app.use("/api/files", aiFileRoutes);

const webScraperRoutes = require("./routes/webScraperRoutes");
app.use("/api/web", webScraperRoutes);

const knowledgeRoutes = require("./routes/knowledgeRoutes");
app.use("/api/knowledge", knowledgeRoutes);

const feedbackRoutes = require("./routes/feedbackRoutes");
app.use("/api", feedbackRoutes);

const modelRoutes = require("./routes/modelRoutes"); 
app.use("/api", modelRoutes);

const { learningJob } = require("./jobs/learningJob");
learningJob();

// 🔹 Iniciar servidor
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));