import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./redux/reducers";

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
