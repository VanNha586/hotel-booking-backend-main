"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("rooms", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      tenant_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "tenants",
          key: "id",
        },
        onDelete: 'SET NULL',
      },

      category_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
        onDelete: 'SET NULL',
      },

      city_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      lat: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },

      lng: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },

      slug: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "INACTIVE",
      },

      exp_date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: new Date()
      },

      phone: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      info: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      size: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      star: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },

      price: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: true,
      },

      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      number_room: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },

      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },

      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    }),

  down: (queryInterface) => queryInterface.dropTable("rooms"),
};
