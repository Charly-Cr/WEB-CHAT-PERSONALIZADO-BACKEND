'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class suggestedfaq extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      suggestedfaq.belongsTo(models.business, {foreignKey: 'businessId'});
    }
  }
  suggestedfaq.init({
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    suggestedCategory: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    suggestedKeywords: {
      type: DataTypes.TEXT, 
      allowNull: false,
      defaultValue: [],
    },
    suggestedResponse: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    matched: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING, // ej: "pending", "approved", "rejected"
      allowNull: false,
      defaultValue: 'pending',
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    approved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
    },
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'business',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'suggestedfaq',
    timestamps: true, // ✅ Sequelize maneja createdAt y updatedAt
  });
  return suggestedfaq;
};