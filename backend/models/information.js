'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Information extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Information.init({
        title: DataTypes.STRING,
        date: DataTypes.STRING,
        dateRequests: DataTypes.STRING,
        place: DataTypes.STRING,
        email: DataTypes.STRING,
        contacts: DataTypes.STRING,
        common: DataTypes.STRING,
        requirements: DataTypes.STRING,
        scientificProgram: DataTypes.STRING,
        aboutText: DataTypes.STRING,
        aboutDescription: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Information',
    });
    return Information;
};
