'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movies.hasMany(models.MovieCast, {
        foreignKey: 'movieId',
        onDelete: 'CASCADE'
      });
      Movies.hasMany(models.Genre, {
        foreignKey: 'movieId',
        onDelete: 'CASCADE'
      });
    }
  }
  Movies.init({
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    synopsis: DataTypes.TEXT,
    trailerUrl: DataTypes.TEXT,
    imgUrl: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    genreId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movies',
  });
  return Movies;
};