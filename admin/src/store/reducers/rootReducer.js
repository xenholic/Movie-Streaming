import { combineReducers } from "redux";
import genreReducer from "./genreReducer";
import movieReducer from "./movieReducer";
import modalReducer from "./modalReducer";

export default combineReducers({
    genreReducer,
    movieReducer,
    modalReducer,
});