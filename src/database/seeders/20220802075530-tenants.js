"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("tenants", [
      {
        id: 1,
        username: `tenant`,
        password: `tenant`,
      },
      {
        id: 2,
        username: `tenant1`,
        password: `tenant1`,
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("tenants", null, {});
  },
};
