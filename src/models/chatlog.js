'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chatlog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      chatlog.belongsTo(models.business, {foreignKey: 'businessId'});
      chatlog.belongsTo(models.faq, {foreignKey: 'matchedFaqId'});
    }
  }
  chatlog.init({
    userMessage: {
        type: DataTypes.TEXT,    
        allowNull: false,
      },
      botResponse: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      matched: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      matchedFaqId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'faq',   // si es fk, apunta a tabla correcta
          key: 'id',
        },
      },
      score: {
        type: DataTypes.FLOAT,
        allowNull: true,
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
    modelName: 'chatlog',
  });
  return chatlog;
};