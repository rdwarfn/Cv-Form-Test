'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let transaction;
    try {
      transaction = await queryInterface.sequelize.transaction();
      await queryInterface.bulkInsert("Profile", [{
        wantedJobTitle: "Software Engineer",
        firstName: "Namaku",
        lastName: "Ukaman",
        email: "ukaman.namaku@gmail.com",
        phone: "08008880000",
        country: "Indonesia",
        city: "Jakarta",
        address: "Jl. Gatot Subroto",
        postalCode: 200001,
        drivingLicense: "1234567890123456",
        nationality: "Indonesia",
        placeOfBirth: "Maluku",
        photoUrl: null,
        dateOfBirth: "07-12-1988",
        createdAt: new Date(),
        updatedAt: new Date()
      }], { transaction });

      await transaction.commit();
    } catch (error) {
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
    await queryInterface.bulkDelete('Profile', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
