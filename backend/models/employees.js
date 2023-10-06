'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Employee extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsToMany(models.Group, { through: models.EmployeeGroup })
            this.hasMany(models.EmployeeGroup)
            this.belongsToMany(models.Section, { through: models.EmployeeSection })
            this.hasMany(models.EmployeeSection)
        }
    }
    Employee.init({
        name: DataTypes.STRING,
        surname: DataTypes.STRING,
        patronymic: DataTypes.STRING,
        post: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Employees',
        underscored: true
    });
    return Employee;
};
