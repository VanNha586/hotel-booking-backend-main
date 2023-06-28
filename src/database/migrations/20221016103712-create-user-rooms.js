"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("user_rooms", {
      id: {
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: 'SET NULL',
      },

      room_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "rooms",
          key: "id",
        },
        onDelete: 'SET NULL',
      },

      status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "INACTIVE",
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

  down: (queryInterface) => queryInterface.dropTable("user_rooms"),
};
