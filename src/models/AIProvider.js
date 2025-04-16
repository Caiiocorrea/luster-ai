const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AIProvider = sequelize.define("AIProvider", {
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  base_url: { type: DataTypes.STRING, allowNull: false },
  api_key: { type: DataTypes.STRING }, // Algumas APIs exigem chave
  models_available: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false }, // Lista de modelos
  status: { type: DataTypes.BOOLEAN, defaultValue: true }, // API ativa ou inativa
});

module.exports = AIProvider;