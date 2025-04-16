const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const AIProvider = require("./AIProvider");

const APIRequestLog = sequelize.define("APIRequestLog", {
  request_text: { type: DataTypes.TEXT, allowNull: false },
  response_text: { type: DataTypes.TEXT, allowNull: false },
  provider_id: { type: DataTypes.INTEGER, allowNull: false },
  model_used: { type: DataTypes.STRING, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Relacionamento: Um log pertence a uma API
APIRequestLog.belongsTo(AIProvider, { foreignKey: "provider_id" });

module.exports = APIRequestLog;