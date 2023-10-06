'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Participants', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            author: {
                type: Sequelize.STRING
            },
            secondAuthor: {
                type: Sequelize.STRING
            },
            thirdAuthor: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            },
            place: {
                type: Sequelize.STRING
            },
            scientificAdviser: {
                type: Sequelize.STRING
            },
            phone: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            file: {
                type: Sequelize.STRING
            },
            sectionId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Sections",
                    key: "id"
                }
            },
            formId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Forms",
                    key: "id"
                }
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
        await queryInterface.dropTable('Participants');
    }
};
