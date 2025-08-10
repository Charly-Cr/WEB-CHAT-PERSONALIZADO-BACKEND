'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('businesses', 'tokensUsed', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "Cantidad de tokens usados por el negocio"
    });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('businesses', 'tokensUsed');
  }
};
