import * as actionType from "../actions/actionType";
const initialState = { isModalShow: false, modalContent: "Create" };

function modalReducer(state = initialState, action) {
    switch (action.type) {
        case actionType.TOGGLE_MODAL:
            return {
                ...state,
                isModalShow: !state.isModalShow,
            };
        case actionType.FORM_TYPE_CREATE:
            return {
                ...state,
                modalContent: "Create",
            };
        case actionType.FORM_TYPE_UPDATE:
            return {
                ...state,
                modalContent: "Update",
            };
        case actionType.MOVIE_CASTS:
            return {
                ...state,
                modalContent: "Casts",
            };
        case actionType.MOVIE_SYNOPSIS:
            return {
                ...state,
                modalContent: "Synopsis",
            };
        default:
            return state;
    }
}

export default modalReducer;