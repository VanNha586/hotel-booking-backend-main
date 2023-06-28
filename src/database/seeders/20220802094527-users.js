"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        id: 1,
        username: `user`,
        name: `user`,
        password: `user`,
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete("users", null, {});
  },
};
