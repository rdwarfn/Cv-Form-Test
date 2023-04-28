'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert("Employment", [
        {
          jobTitle: "CEO",
          employer: "Toko Lapak",
          startDate: "01-01-2020",
          endDate: "01-01-2021",
          city: "Jakarta",
          description: "CEO",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          jobTitle: "UI/UX Designer",
          employer: "Pemprov DKI",
          startDate: "01-01-2021",
          endDate: "01-01-2022",
          city: "Jakarta",
          description: "Designer",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
      await transaction.commit();
    } catch (error) {
      console.log("*** seed error employment: ", error)
      await transaction.rollback();
    }
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Employment", null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
