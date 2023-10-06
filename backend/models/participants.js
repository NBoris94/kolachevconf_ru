'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Participants extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Form)
            this.belongsTo(models.Section)
        }
    }
    Participants.init({
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        author: DataTypes.STRING,
        secondAuthor: DataTypes.STRING,
        thirdAuthor: DataTypes.STRING,
        status: DataTypes.STRING,
        place: DataTypes.STRING,
        scientificAdviser: DataTypes.STRING,
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        file: DataTypes.STRING,
        sectionId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Sections",
                key: "id"
            }
        },
        formId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Forms",
                key: "id"
            }
        }
    }, {
        sequelize,
        modelName: 'Participants',
    });
    return Participants;
};
