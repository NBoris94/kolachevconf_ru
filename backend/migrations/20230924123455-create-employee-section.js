'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('EmployeeSections', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            employeeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Employees",
                    key: "id"
                }
            },
            sectionId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Sections",
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
        await queryInterface.dropTable('EmployeeSections');
    }
};
