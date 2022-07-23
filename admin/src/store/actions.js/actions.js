import * as actionType from "./actionType";
const url = "https://pojan-flix.herokuapp.com";
const accessToken = localStorage.getItem("accessToken");

export const fetchGenre = () => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${url}/genres`);
                if (!response.ok) {
                    throw response;
                }
                const json = await response.json();
                const data = json.data;
                dispatch({
                    type: actionType.GENRE_READ,
                    payload: data,
                });
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    };
};

export const fetchOneGenre = (id) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${url}/genres/${id}`);
                if (!response.ok) {
                    throw response;
                }
                const json = await response.json();
                const data = json.data;
                dispatch({
                    type: actionType.GENRE_READ_ONE,
                    payload: data,
                });
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    };
};

export const deleteGenre = (id) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${url}/genres/${id}`, {
                    method: "DELETE",
                    headers: {
                        access_token: accessToken,
                    },
                });
                if (!response.ok) {
                    throw response;
                }

                const { genres } = getState().genreReducer;
                const _genres = genres.filter((genre) => genre.id !== id);
                dispatch({
                    type: actionType.GENRE_READ,
                    payload: _genres,
                });
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    };
};

export const addGenre = (name) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${url}/genres/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        access_token: accessToken,
                    },
                    body: JSON.stringify({
                        name,
                    }),
                });
                if (!response.ok) {
                    throw response;
                }
                const json = await response.json();
                const data = json.data;
                const { genres } = getState().genreReducer;
                const _genres = [...genres, data];

                dispatch({
                    type: actionType.GENRE_READ,
                    payload: _genres,
                });
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    };
};

export const editGenre = (id, name) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${url}/genres/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        access_token: accessToken,
                    },
                    body: JSON.stringify({
                        name,
                    }),
                });

                if (!response.ok) {
                    throw response;
                }

                const json = await response.json();
                const data = json.data;
                const { genres } = getState().genreReducer;
                const _genres = genres.map((genre) => {
                    if (genre.id === id) {
                        return data;
                    } else {
                        return genre;
                    }
                });
                dispatch({
                    type: actionType.GENRE_READ,
                    payload: _genres,
                });

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    };
};

export const fetchMovie = () => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${url}/movies`);
                if (!response.ok) {
                    throw response;
                }
                const json = await response.json();
                const data = json.data;
                dispatch({
                    type: actionType.MOVIE_READ,
                    payload: data,
                });
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    };
};

export const fetchOneMovie = (slug) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${url}/movies/${slug}`);
                if (!response.ok) {
                    throw response;
                }
                const json = await response.json();
                const data = json.data;
                dispatch({
                    type: actionType.MOVIE_READ_ONE,
                    payload: data,
                });
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    };
};

export const deleteMovie = (id) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${url}/movies/${id}`, {
                    method: "DELETE",
                    headers: {
                        access_token: accessToken,
                    },
                });
                if (!response.ok) {
                    throw response;
                }

                const { movies } = getState().movieReducer;
                const _movies = movies.filter((movie) => movie.id !== id);
                dispatch({
                    type: actionType.MOVIE_READ,
                    payload: _movies,
                });

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    };
};

export const addMovie = (movieObj) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${url}/movies`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        access_token: accessToken,
                    },
                    body: JSON.stringify(movieObj),
                });
                if (!response.ok) {
                    throw response;
                }

                const json = await response.json();
                const data = json.data.movieWithAssociation;

                const { movies } = getState().movieReducer;
                const _movies = [...movies, data];

                dispatch({
                    type: actionType.MOVIE_READ,
                    payload: _movies,
                });

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    };
};

export const editMovie = (movieObj) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { id } = movieObj;
                const response = await fetch(`${url}/movies/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        access_token: accessToken,
                    },
                    body: JSON.stringify(movieObj),
                });
                if (!response.ok) {
                    throw response;
                }

                const { movies } = getState().movieReducer;
                const _movies = movies.map((movie) => {
                    if (movie.id === id) {
                        return movieObj;
                    } else {
                        return movie;
                    }
                });
                dispatch({
                    type: actionType.MOVIE_READ,
                    payload: _movies,
                });

                resolve();
            } catch (err) {
                reject(err);
            }
        });
    };
};

export const addAdmin = (adminObj) => {
    return () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${url}/registerAdmin`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        access_token: accessToken,
                    },
                    body: JSON.stringify(adminObj),
                });
                if (!response.ok) {
                    throw response;
                }
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    };
};

export const login = (adminObj) => {
    return () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${url}/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(adminObj),
                });
                if (!response.ok) {
                    throw response;
                }
                const json = await response.json();
                const data = json.data;
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    };
};