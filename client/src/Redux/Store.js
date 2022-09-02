import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer as authReducer } from "./Auth/auth.reducer";
import { reducer as appReducer } from "./App/app.reducer";

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
});

export const Store = legacy_createStore(rootReducer, applyMiddleware(thunk));
