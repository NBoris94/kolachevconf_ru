'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Forms extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.Participant)
        }
    }
    Forms.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Forms',
        underscored: true
    });
    return Forms;
};
