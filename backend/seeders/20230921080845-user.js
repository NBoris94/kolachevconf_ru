'use strict';
const bcrypt = require('bcrypt');

const admin = {
    name: 'Admin',
    email: 'admin@kolachevconf.ru',
    password: bcrypt.hashSync('B33d8H30_!', 10),
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [{
            name: admin.name,
            email: admin.email,
            password: admin.password,
            refreshToken: '',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
