'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      plan.hasMany(models.business, { foreignKey: "planId" });
    }
  }
  plan.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    tokenLimit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Límite de tokens que permite el plan"
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
      comment: "Precio mensual o anual del plan"
    },
    comment: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Descripción o comentario del plan'
   },
  }, {
    sequelize,
    modelName: 'plan',
    timestamps: true, // ✅ Sequelize maneja createdAt y updatedAt
  });
  return plan;
};