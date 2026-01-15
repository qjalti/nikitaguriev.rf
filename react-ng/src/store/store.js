import { createStore } from "redux";
import calculationsReducer from "./calculationsReducer";

const store = createStore(calculationsReducer);

export default store;
