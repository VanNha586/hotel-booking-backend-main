module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "admins",
          "role_id",
          {
            allowNull: true,
            type: Sequelize.INTEGER,
            references: {
              model: "roles",
              key: "id",
            },
          },
        ),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn(
          "admins",
          "role_id",
        ),
      ]);
    });
  },
};
