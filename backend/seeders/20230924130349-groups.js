'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Groups', [
            {
                title: 'Программный комитет VIII Всероссийской молодежной научно-практической конференции «Колачёвские чтения»',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Состав рабочей группы Конференции',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },

    async down (queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
