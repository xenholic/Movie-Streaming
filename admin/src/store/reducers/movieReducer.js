import * as actionType from "../actions/actionType";

let initialState = {
    movies: [],
    movie: {
        id: "",
        title: "",
        slug: "",
        synopsis: "",
        trailerUrl: "",
        imgUrl: "",
        rating: "",
        genreId: "",
        authorId: "",
        createdAt: "",
        updatedAt: "",
    },
};

function movieReducer(state = initialState, action) {
    switch (action.type) {
        case actionType.MOVIE_READ:
            return {
                ...state,
                movies: action.payload,
            };
        case actionType.MOVIE_READ_ONE:
            return {
                ...state,
                movie: action.payload,
            };
        // case actionType.MOVIE_DELETE:
        //   return {
        //     ...state,
        //     movies: state.movies.filter((movie) => movie.id !== action.payload),
        //   };
        // case actionType.MOVIE_CREATE:
        //   return {
        //     ...state,
        //     movies: [...state.movies, action.payload],
        //   };
        // case actionType.MOVIE_UPDATE:
        //   return {
        //     ...state,
        //     movies: state.movies.map((movie) => {
        //       if (movie.id === action.payload.id) {
        //         return action.payload;
        //       } else {
        //         return movie;
        //       }
        //     }),
        //   };
        default:
            return state;
    }
}

export default movieReducer;