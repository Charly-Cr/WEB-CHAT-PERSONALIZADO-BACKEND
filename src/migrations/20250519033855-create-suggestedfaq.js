'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('suggestedfaqs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      suggestedCategory: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      suggestedKeywords: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: Sequelize.literal(`'[]'::json`),
      },
      suggestedResponse: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      matched: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
      },
      score: {
      type: Sequelize.FLOAT,
      allowNull: true
      },
      status: {
      type: Sequelize.STRING, 
      allowNull: false,
      defaultValue: 'pending',
      },
      comment: {
      type: Sequelize.TEXT,
      allowNull: true,
      },
      approved: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
      },
      businessId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'businesses',
        key: 'id'
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") //marca de tiempo actual
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") //marca de tiempo actual
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('suggestedfaqs');
  }
};