'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Sections extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsToMany(models.Person, { through: models.PersonSection })
            this.hasMany(models.PersonSection)
            this.hasMany(models.Participant)
        }
    }
    Sections.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Sections',
    });
    return Sections;
};
