"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tenants", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      name: {
        allowNull: true,
        type: Sequelize.STRING,
      },

      username: {
        type: Sequelize.STRING,
      },

      password: {
        type: Sequelize.STRING,
      },

      tokens: {
        allowNull: true,
        type: Sequelize.JSON,
        defaultValue: []
      },

      address: {
        allowNull: true,
        type: Sequelize.STRING,
      },

      status: {
        type: Sequelize.STRING,
        defaultValue: "INACTIVE"
      },

      phone: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: "0775600351"
      },

      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },

      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tenants");
  },
};
