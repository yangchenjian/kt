import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

import loadingReducer from "./reducers/loadingReducer";
import configReducer    from "./reducers/configListReducer";
import loginReducer    from "./reducers/loginReducer";


let reducers = combineReducers({
	loading : loadingReducer,
	configListData: configReducer,
  loginState: loginReducer
});
let store = createStoreWithMiddleware(reducers);

export default store;
