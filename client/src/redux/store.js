import { applyMiddleware, createStore } from "redux";
import rootReducer from "./rootReducer.js";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//redux middlewares
const middlewares = [thunk];

//create store
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

//export
export default store;
