import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
} from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import logger from "../middlewares/logger";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, logger))
);

export default store;