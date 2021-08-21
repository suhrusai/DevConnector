import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import * as authActionCreators from "./actions/auth";
import * as profileActionCreators from "./actions/profile";
// import setAuthToken f/rom "./utils/setAuthToken";

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
// const composeEnhancers = composeWithDevTools(
//     {
//         authActionCreators,
//         trace: true,
//         traceLimit: 25,
//     },
//     {
//         profileActionCreators,
//         trace: true,
//         traceLimit: 25,
//     }
// );
// const store = createStore(
//     rootReducer,
//     initialState,
//     composeEnhancers(applyMiddleware(...middleware))
// );
export default store;
