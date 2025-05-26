'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chatlogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userMessage: {
        type: Sequelize.TEXT,    
        allowNull: false,
      },
      botResponse: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      matched: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      matchedFaqId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'faqs',         
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      score: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      businessId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'businesses',  
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('chatlogs');
  }
};