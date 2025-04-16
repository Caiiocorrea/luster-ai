const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const AIAgent = require("./AIAgent");

const AIRules = sequelize.define("AIRules", {
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
  rule_text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: "AIRules",
  timestamps: true,
});

module.exports = AIRules;