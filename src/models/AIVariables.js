const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const AIAgent = require("./AIAgent");

const AIVariables = sequelize.define("AIVariables", {
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
  variable_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  variable_value: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: "AIVariables",
  timestamps: true,
});

module.exports = AIVariables;