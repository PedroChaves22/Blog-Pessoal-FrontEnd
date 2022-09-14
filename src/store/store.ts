import { createStore } from "redux";
import { tokenReducer } from "./tokens/actions";

export const store = createStore(tokenReducer)