"use strict";
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("admins", [
      {
        id: 1,
        role_id: 2,
        username: `admin`,
        name: `admin`,
        password: `admin`,
      },
      {
        id: 2,
        role_id: 1,
        username: `admin1`,
        name: `admin1`,
        password: `admin1`,
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("admins", null, {});
  },
};
