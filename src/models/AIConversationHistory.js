const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const AIAgent = require("./AIAgent");

const AIConversationHistory = sequelize.define(
  "AIConversationHistory",
  {
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
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    user_input: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ai_response: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "AIConversationHistories",
    timestamps: true,
  }
);

module.exports = AIConversationHistory;