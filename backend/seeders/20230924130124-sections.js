'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Sections', [
            {
                name: 'Секция №1. Информатика, вычислительная техника и управление',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Секция №2. Материаловедение, технология и автоматизация обработки материалов',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Секция №3. Аэрокосмическая техника и технологии',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Секция №4. Менеджмент, экономические и социально-гуманитарные проблемы современного мира',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Секция №5. Юный исследователь',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Sections', null, {})
    }
};
