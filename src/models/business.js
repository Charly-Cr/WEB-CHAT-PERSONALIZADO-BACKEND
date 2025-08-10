'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class business extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      business.belongsTo(models.user, { foreignKey: "userId" })
      business.hasMany(models.service, { foreignKey: "businessId" })
    }
  }
  business.init({
    businessName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hours: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Horario general del negocio (ej. L-V 8am-6pm)"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    businessType: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Ej. barbería, veterinaria, tienda"
    },
    contactInfo: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {
        phone: '',
        email: '',
        address: ''
      }
    },
    socialLinks: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {
        facebook: '',
        instagram: '',
        linkendin:'',
        twitter: '',
        tiktok: '',
        youtube: '',
        whatsapp: '',
        telegram: '',
      }
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
    },
    slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    },
    tokensUsed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: "Cantidad de tokens usados por el negocio",
    },
    primaryColor: {
    type: DataTypes.STRING,
    defaultValue: '#4f46e5',
    },
    secondaryColor: {
    type: DataTypes.STRING,
    defaultValue: '#14b8a6',
    },
    backgroundColor: {
    type: DataTypes.STRING,
    defaultValue: '#0f172a',
    },
    textColor: {
    type: DataTypes.STRING,
    defaultValue: '#ffffff',
    },
  }, {
    sequelize,
    modelName: 'business',
  });
  return business;
};