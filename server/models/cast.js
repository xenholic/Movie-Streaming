'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cast.belongsTo(models.Movie, {
        foreignKey: 'movieId',
        onDelete: 'CASCADE'
      });
    }
  }
  Cast.init({
    name: DataTypes.STRING,
    profilePict: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Cast',
  });
  return Cast;
};