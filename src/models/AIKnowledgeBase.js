const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const AIAgent = require("./AIAgent");

const AIKnowledgeBase = sequelize.define("AIKnowledgeBase", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  agent_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: AIAgent, // ✅ Referência correta para AIAgents
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: "AIKnowledgeBases",
  timestamps: true,
});

module.exports = AIKnowledgeBase;