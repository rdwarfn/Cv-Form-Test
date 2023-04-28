'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const transaction = await queryInterface.sequelize.transaction();
   try {
    await queryInterface.bulkInsert("Skill", [{
      skill: "Docker",
      level: "Expert",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    await transaction.commit();
   } catch (error) {
    console.log("error", error)
    await transaction.rollback();
   }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Skill", null, {});
  }
};
