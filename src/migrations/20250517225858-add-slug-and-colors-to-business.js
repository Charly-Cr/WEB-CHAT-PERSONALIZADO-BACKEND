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
    await queryInterface.addColumn('businesses', 'slug', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });

    await queryInterface.addColumn('businesses', 'primaryColor', {
      type: Sequelize.STRING,
      defaultValue: '#4f46e5',
    });

    await queryInterface.addColumn('businesses', 'secondaryColor', {
      type: Sequelize.STRING,
      defaultValue: '#14b8a6',
    });

    await queryInterface.addColumn('businesses', 'backgroundColor', {
      type: Sequelize.STRING,
      defaultValue: '#0f172a',
    });

    await queryInterface.addColumn('businesses', 'textColor', {
      type: Sequelize.STRING,
      defaultValue: '#ffffff',
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('businesses', 'slug');
    await queryInterface.removeColumn('businesses', 'primaryColor');
    await queryInterface.removeColumn('businesses', 'secondaryColor');
    await queryInterface.removeColumn('businesses', 'backgroundColor');
    await queryInterface.removeColumn('businesses', 'textColor');
  }
};
