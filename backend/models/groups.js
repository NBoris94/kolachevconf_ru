'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Groups extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsToMany(models.Person, { through: models.PersonGroup })
            this.hasMany(models.PersonGroup)
        }
    }
    Groups.init({
        title: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Groups',
    });
    return Groups;
};
