import * as actionType from "../actions/actionType";

let initialState = {
    genres: [],
    genre: {
        id: "",
        name: "",
        createdAt: "",
        updatedAt: "",
    },
};

function genreReducer(state = initialState, action) {
    switch (action.type) {
        case actionType.GENRE_READ:
            return {
                ...state,
                genres: action.payload,
            };
        case actionType.GENRE_READ_ONE:
            return {
                ...state,
                genre: action.payload,
            };
        // case actionType.GENRE_DELETE:
        //   return {
        //     ...state,
        //     genres: state.genres.filter((genre) => genre.id !== action.payload),
        //   };
        // case actionType.GENRE_CREATE:
        //   return {
        //     ...state,
        //     genres: [...state.genres, action.payload],
        //   };
        // case actionType.GENRE_UPDATE:
        //   return {
        //     ...state,
        //     genres: state.genres.map((genre) => {
        //       if (genre.id === action.payload.id) {
        //         return action.payload;
        //       } else {
        //         return genre;
        //       }
        //     }),
        //   };
        default:
            return state;
    }
}

export default genreReducer;