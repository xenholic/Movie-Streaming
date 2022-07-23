const { User, Movie, Genre, Cast, MovieCast } = require('../models');


class Controller {

    static async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({
                where: {
                    username
                }
            });
            if (!user) {
                return res.status(400).json({
                    message: 'Invalid username or password'
                });
            }
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {

                return res.status(400).json({
                    message: 'Invalid username or password'
                });
            }
            const token = user.generateToken();
            return res.status(200).json({
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    phoneNumber: user.phoneNumber,
                    address: user.address
                }
            });
        } catch (error) {
            next(error);
        }
    }


    static async registerAdmin(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body;
            const createAdmin = await User.create({
                username,
                email,
                password,
                role: "admin",
                phoneNumber,
                address
            });
            return res.status(201).json({
                message: 'Admin created successfully',
                user: {
                    id: createAdmin.id,
                    username: createAdmin.username,
                    email: createAdmin.email,
                    role: createAdmin.role,
                    phoneNumber: createAdmin.phoneNumber,
                    address: createAdmin.address
                }
            });

        } catch (err) {
            next(err)
        }
    }

    static async registerUser(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body;
            const createUser = await User.create({
                username,
                email,
                password,
                role: "user",
                phoneNumber,
                address
            });
            return res.status(201).json({
                message: 'User created successfully',
                user: {
                    id: createUser.id,
                    username: createUser.username,
                    email: createUser.email,
                    role: createUser.role,
                    phoneNumber: createUser.phoneNumber,
                    address: createUser.address
                }
            });

        } catch (err) {
            next(err)
        }
    }

    static async getAllUsers(req, res, next) {
        try {
            const users = await User.findAll();
            return res.status(200).json(users);
        } catch (err) {
            next(err)
        }
    }

    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findOne({
                where: {
                    id
                }
            });
            return res.status(200).json(user);
        } catch (err) {
            next(err)
        }
    }

    static async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const { username, email, password, phoneNumber, address } = req.body;
            const updateUser = await User.update({
                username,
                email,
                password,
                phoneNumber,
                address
            }, {
                where: {
                    id
                }
            });
            return res.status(200).json({
                message: 'User updated successfully',
                user: {
                    id,
                    username,
                    email,
                    phoneNumber,
                    address
                }
            });
        } catch (err) {
            next(err)
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const deleteUser = await User.destroy({
                where: {
                    id
                }
            });
            return res.status(200).json({
                message: 'User deleted successfully'
            });
        } catch (err) {
            next(err)
        }
    }

    static async getAllMovies(req, res, next) {
        try {
            const movies = await Movie.findAll();
            return res.status(200).json(movies);
        } catch (err) {
            next(err)
        }
    }

    static async getMovieById(req, res, next) {
        try {
            const { id } = req.params;
            const movie = await Movie.findOne({
                where: {
                    id
                }
            });
            return res.status(200).json(movie);
        } catch (err) {
            next(err)
        }
    }

    static async getMovieBySlug(req, res, next) {
        try {
            const { slug } = req.params;
            const movie = await Movie.findOne({
                where: {
                    slug
                }
            });
            return res.status(200).json(movie);
        } catch (err) {
            next(err)
        }
    }

    static async createMovie(req, res, next) {
        try {
            const { title, synopsis, rating, genreId, slug, imgUrl, trailerUrl, authorId } = req.body;
            const createMovie = await Movie.create({
                title,
                slug,
                synopsis,
                trailerUrl,
                imgUrl,
                rating,
                genreId,
                authorId
            });
            return res.status(201).json({
                message: 'Movie created successfully',
                movie: {
                    id: createMovie.id,
                    title: createMovie.title,
                    synopsis: createMovie.synopsis,
                    trailerUrl: createMovie.trailerUrl,
                    imgUrl: createMovie.imgUrl,
                    rating: createMovie.rating,
                    genreId: createMovie.genreId,
                    authorId: createMovie.authorId
                }
            });
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller;