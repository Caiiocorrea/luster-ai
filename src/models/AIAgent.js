const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); 

const AIAgent = sequelize.define("AIAgent", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prompt: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true, // Criará createdAt e updatedAt automaticamente
});

module.exports = AIAgent;