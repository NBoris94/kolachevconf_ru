'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EmployeeSection extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Employee)
            this.belongsTo(models.Section)
        }
    }
    EmployeeSection.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        employeeId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Employees",
                key: "id",
            },
        },
        sectionId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Sections",
                key: "id",
            },
        }
    }, {
        sequelize,
        modelName: 'EmployeeSection',
        underscored: true
    });
    return EmployeeSection;
};
