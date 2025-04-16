const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const AIConversationHistory = require("./AIConversationHistory");
const AIAgent = require("./AIAgent");

const AIFeedback = sequelize.define("AIFeedback", { 
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  agent_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: AIAgent,
      key: "id",
    },
  },
  conversation_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: AIConversationHistory,
      key: "id",
    },
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  original_response: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  suggested_correction: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("pendente", "aprovado", "rejeitado"),
    defaultValue: "pendente",
  },
});

module.exports = AIFeedback;