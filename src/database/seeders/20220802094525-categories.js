"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        id: 1,
        name: "Phòng trọ, nhà trọ",
        image: "https://www.edisonhotelnyc.com/resourcefiles/homeimages/edison-hero-image-facade.jpg?version=9142022133607"
      },
      {
        id: 2,
        name: "Nhà thuê nguyên căn",
        image: "https://www.edisonhotelnyc.com/resourcefiles/homeimages/edison-hero-image-facade.jpg?version=9142022133607"
      },
      {
        id: 3,
        name: "Cho thuê căn hộ",
        image: "https://www.edisonhotelnyc.com/resourcefiles/homeimages/edison-hero-image-facade.jpg?version=9142022133607"
      },
      {
        id: 4,
        name: "Cho thuê căn hộ mini",
        image: "https://www.edisonhotelnyc.com/resourcefiles/homeimages/edison-hero-image-facade.jpg?version=9142022133607"
      },
      {
        id: 5,
        name: "Tìm người ở ghép",
        image: "https://www.edisonhotelnyc.com/resourcefiles/homeimages/edison-hero-image-facade.jpg?version=9142022133607"
      },
      {
        id: 6,
        name: "Cho thuê mặt bằng",
        image: "https://www.edisonhotelnyc.com/resourcefiles/homeimages/edison-hero-image-facade.jpg?version=9142022133607"
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
