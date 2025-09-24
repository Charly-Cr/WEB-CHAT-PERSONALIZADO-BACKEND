'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class faq extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      faq.belongsTo(models.business, {foreignKey: 'businessId'});
    }
  }
  faq.init({
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    keywords: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: [],
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'business',
        key: 'id'
      },
    },
  }, {
    sequelize,
    modelName: 'faq',
    timestamps: true, // ✅ Sequelize maneja createdAt y updatedAt
  });
  return faq;
};