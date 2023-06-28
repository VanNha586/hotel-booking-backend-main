"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("permissions", [
      {
        id: 1,
        perm_name: `dashboard`,
      },
      {
        id: 2,
        perm_name: `rooms`,
      },
      {
        id: 3,
        perm_name: `tenants`,
      },
      {
        id: 4,
        perm_name: `users`,
      },
      {
        id: 5,
        perm_name: `accounts`,
      },
      {
        id: 6,
        perm_name: `roles`,
      },
      {
        id: 7,
        perm_name: `maps`,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
