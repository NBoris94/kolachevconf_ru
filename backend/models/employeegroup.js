'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EmployeeGroup extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Employee)
            this.belongsTo(models.Group)
        }
    }
    EmployeeGroup.init({
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
        groupId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Groups",
                key: "id",
            },
        }
    }, {
        sequelize,
        modelName: 'EmployeeGroup',
        underscored: true
    });
    return EmployeeGroup;
};
