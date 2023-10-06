'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Information', [{
            title: 'Колачёвские чтения',
            date: '07 апреля 2023',
            dateRequests: '30 марта 2023',
            place: 'Ступинский филиал МАИ, г. Ступино, Московская область, ул. Пристанционная, д. 4.',
            email: 'kolachevconf@yandex.ru',
            contacts: '',
            common: '',
            requirements: '',
            scientificProgram: '',
            aboutText: '',
            aboutDescription: '',
            createdAt: new Date(),
            updatedAt: new Date()
        }])
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Information', null, {});
    }
};
