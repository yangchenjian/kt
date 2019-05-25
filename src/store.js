import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

import loadingReducer from "./reducers/loadingReducer";
import testReducer    from "./reducers/testReducer";
import loginReducer    from "./reducers/loginReducer";


let reducers = combineReducers({
	loading : loadingReducer,
	test : testReducer,
  loginState: loginReducer

});

let store = createStoreWithMiddleware(reducers);

export default store;
