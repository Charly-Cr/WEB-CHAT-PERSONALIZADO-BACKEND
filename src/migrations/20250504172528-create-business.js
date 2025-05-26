'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('businesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      businessName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      hours: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "Horario general del negocio (ej. L-V 8am-6pm)"
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      businessType: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "Ej. barbería, veterinaria, tienda"
      },
      contactInfo: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: {
          phone: '',
          email: '',
          address: ''
        }
      },
      socialLinks: {
        type: Sequelize.JSONB,
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
        type: Sequelize.STRING,
        allowNull: true
      },
      logo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('businesses');
  }
};