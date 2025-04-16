const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const AIAgent = require("./AIAgent");

const AIContext = sequelize.define("AIContext", {
  agent_id: { 
    type: DataTypes.INTEGER, 
    references: { model: AIAgent, key: "id" }, 
    onDelete: "CASCADE" 
  },
  context_summary: { type: DataTypes.TEXT, allowNull: false }
});

AIAgent.hasOne(AIContext, { foreignKey: "agent_id" });
AIContext.belongsTo(AIAgent, { foreignKey: "agent_id" });

module.exports = AIContext;