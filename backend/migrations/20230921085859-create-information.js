'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Information', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            date: {
                type: Sequelize.STRING
            },
            dateRequests: {
                type: Sequelize.STRING
            },
            place: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            contacts: {
                type: Sequelize.STRING
            },
            common: {
                type: Sequelize.STRING
            },
            requirements: {
                type: Sequelize.STRING
            },
            scientificProgram: {
                type: Sequelize.STRING
            },
            aboutText: {
                type: Sequelize.STRING
            },
            aboutDescription: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Information');
    }
};
