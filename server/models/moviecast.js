'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieCast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MovieCast.belongsTo(models.Movie, {
        foreignKey: 'movieId',
        onDelete: 'CASCADE'
      });
      MovieCast.belongsTo(models.Cast, {
        foreignKey: 'castId',
        onDelete: 'CASCADE'
      });
    }
  }
  MovieCast.init({
    movieId: DataTypes.INTEGER,
    castId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MovieCast',
  });
  return MovieCast;
};